import { Request, Response, NextFunction } from "express";

export const createProduct = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, price, image } = req.body;

    const data = {
      name,
      price: Number(price),
      image,
    };
    if (req.file) {
      data.image = req.file.filename;
    }

    res.status(201).json({ message: "create product success", data });
  } catch (error) {
    next(error);
  }
};
