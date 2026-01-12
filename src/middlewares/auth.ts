import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

interface UserPayload {
  id: number;
  email: string;
}

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const payload = jwt.verify(token, "secret") as UserPayload;

    // simpan hasil decoded token ke dalam request
    (req as any).user = payload;

    next();
  } catch (error) {
    next(error);
  }
};
