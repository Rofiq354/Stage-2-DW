// Import Prisma client
import { prisma } from "../lib/prisma";
import { Request, Response } from "express";

// Function to get order summary grouped by userId with pagination
export async function getOrderSummary(req: Request, res: Response) {
  try {
    // Parse query parameters for pagination
    const limit = parseInt(req.query.limit as string) || 10;
    const offset = parseInt(req.query.offset as string) || 0;

    const summary = await prisma.order.groupBy({
      by: ["userId"],
      _count: {
        id: true,
      },
      orderBy: [
        {
          userId: "asc",
        },
      ],
      skip: offset,
      take: limit,
    });

    // Fetch user names
    const userIds = summary.map((s) => s.userId);
    const users = await prisma.user.findMany({
      where: {
        id: { in: userIds },
      },
      select: {
        id: true,
        name: true,
      },
    });

    // Combine
    const result = summary.map((s) => {
      const user = users.find((u) => u.id === s.userId);
      return {
        userId: s.userId,
        userName: user?.name || "Unknown",
        totalOrders: s._count.id,
      };
    });

    // Send the response
    res.json({
      success: true,
      message: "Order summary fetched successfully",
      data: result,
      pagination: {
        limit,
        offset,
      },
    });
  } catch (error) {
    console.error("Error fetching order summary:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}
