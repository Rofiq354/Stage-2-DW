import { NextFunction, Request, Response } from "express";
import { prisma } from "../db/client";
import { createProductSchema } from "../validations/product";

export const getProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const products = await prisma.product.findMany({
      skip: (Number(page) - 1) * Number(limit),
      take: Number(limit),
    });
    res.status(200).json({
      success: true,
      data: products,
      pagination: {
        total: await prisma.product.count(),
        page: Number(page),
        limit: Number(limit),
        pages: Math.ceil((await prisma.product.count()) / Number(limit)),
      },
    });
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { error } = createProductSchema.validate(req.body);

    if (error) {
      res.status(400).json({ success: false, message: error.message });
      return;
    }

    const product = await prisma.product.create({
      data: req.body,
    });
    res.status(201).json({
      success: true,
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = await prisma.product.update({
      where: {
        id: Number(req.params.id),
      },
      data: req.body,
    });
    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = await prisma.product.delete({
      where: {
        id: Number(req.params.id),
      },
    });
    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    next(error);
  }
};
