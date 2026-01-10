import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  try {
    const token = authHeader.split(" ")[1];
    const decoded = verifyToken(token);
    (req as any).user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: "Invalid token", error });
  }
};

export const authRoleMiddleware = (role: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if ((req as any).user.role !== role) {
      return res.status(403).json({ success: false, message: "Forbidden" });
    }
    next();
  };
};
