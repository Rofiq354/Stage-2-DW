import { NextFunction, Request, Response } from "express";
import { prisma } from "../db/client";

export const getSuppliers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const suppliers = await prisma.supplier.findMany({
      skip: (Number(page) - 1) * Number(limit),
      take: Number(limit),
      select: {
        id: true,
        phone: true,
        userId: true,
        user: {
          select: {
            email: true,
            username: true,
          },
        },
      },
    });

    res.status(200).json({
      success: true,
      data: suppliers,
      pagination: {
        total: await prisma.supplier.count(),
        page: Number(page),
        limit: Number(limit),
        pages: Math.ceil((await prisma.supplier.count()) / Number(limit)),
      },
    });
  } catch (error) {
    next(error);
  }
};
