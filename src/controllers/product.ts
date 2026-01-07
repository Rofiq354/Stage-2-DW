import { Request, Response } from "express";
import { prisma } from "../connections/client";

/**
 * Get all products from the database.
 *
 * @returns {Promise<Response>} A response object with the list of products.
 * If an error occurs, it returns a response object with a status code of 500 and an error message.
 */
export const getProducts = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { sortBy, order, minPrice, maxPrice, limit, offset, stock } = req.query;

  const filter: any = {};

  if (minPrice) filter.price = { gte: parseFloat(minPrice as string) };
  if (maxPrice)
    filter.price = {
      ...(filter.price || {}),
      lte: parseFloat(maxPrice as string),
    };

  if (stock) filter.stock = Number(stock);

  try {
    const products = await prisma.product.findMany({
      where: filter,
      orderBy: {
        [sortBy as string]: order as "asc" | "desc",
      },
      take: limit ? Number(limit) : undefined,
      skip: offset ? Number(offset) : undefined,
    });

    const total = await prisma.product.count({ where: filter });

    return res
      .status(200)
      .json({
        success: true,
        data: products,
        pagination: {
          limit: limit ? Number(limit) : undefined,
          offset: offset ? Number(offset) : undefined,
        },
        total: total,
      });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

/**
 * Create a new product in the database.
 *
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 *
 * @returns {Promise<Response>} A response object with the newly created product.
 * If an error occurs, it returns a response object with a status code of 500 and an error message.
 */
export const createProduct = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const product = await prisma.product.create({
      data: {
        name: req.body.name,
        price: req.body.price,
        stock: req.body.stock,
      },
    });

    return res
      .status(201)
      .json({ message: "Data created successfully", data: product });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

/**
 * Update a product in the database.
 *
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 *
 * @returns {Promise<Response>} A response object with the updated product.
 * If an error occurs, it returns a response object with a status code of 500 and an error message.
 */
export const updateProduct = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const product = await prisma.product.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        name: req.body.name,
        price: req.body.price,
        stock: req.body.stock,
      },
    });
    return res
      .status(200)
      .json({ message: "Data updated successfully", data: product });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

/**
 * Delete a product from the database.
 *
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 *
 * @returns {Promise<Response>} A response object with the deleted product.
 * If an error occurs, it returns a response object with a status code of 500 and an error message.
 */
export const deleteProduct = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const product = await prisma.product.delete({
      where: {
        id: Number(req.params.id),
      },
    });
    return res
      .status(200)
      .json({ message: "Data deleted successfully", data: product });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
