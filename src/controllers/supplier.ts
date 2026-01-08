import { NextFunction, Request, Response } from "express";
import { prisma } from "../connections/client";
import AppError from "../lib/custom-error";

export const getSupplierStockProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { productId, supplierId, receiveStock, substractStock } = req.body;
    const [product, supplier] = await Promise.all([
      prisma.product.findUnique({
        where: { id: productId },
      }),
      prisma.supplier.findUnique({
        where: {
          id: supplierId,
        },
      }),
    ]);

    await prisma.$transaction(async (tx) => {
      if (!product) {
        throw new AppError("Product not found", 404);
      }
      if (!supplier) {
        throw new AppError("Supplier not found", 404);
      }
      if (product.stock < substractStock) {
        throw new AppError("Stock not enough", 400);
      }

      if (receiveStock) {
        await tx.product.update({
          where: { id: productId },
          data: { stock: { increment: receiveStock } },
        });

        await tx.stockMovement.create({
          data: {
            productId,
            supplierId,
            quantity: receiveStock,
            type: "IN",
          },
        });
      }

      if (substractStock) {
        await tx.product.update({
          where: { id: productId },
          data: { stock: { decrement: substractStock } },
        });
        await tx.stockMovement.create({
          data: {
            productId,
            supplierId,
            quantity: substractStock,
            type: "OUT",
          },
        });
      }

      res.status(200).json({ message: "Stock updated successfully" });
    });
  } catch (error) {
    next(error);
  }
};
