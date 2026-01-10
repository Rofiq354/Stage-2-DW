import { NextFunction, Request, Response } from "express";
import { prisma } from "../db/client";

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const users = await prisma.user.findMany({
      skip: (Number(page) - 1) * Number(limit),
      take: Number(limit),
    });
    res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      data: users,
      pagination: {
        total: await prisma.user.count(),
        page,
        limit,
        pages: Math.ceil((await prisma.user.count()) / 10),
      },
    });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await prisma.user.delete({
      where: {
        id: Number(req.params.id),
      },
    });
    res.status(200).json({
      success: true,
      message: "User deleted successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};
