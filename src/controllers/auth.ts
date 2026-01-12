import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const login = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new Error("Email and password are required");
    }

    const user = {
      id: 1,
      username: "Ainur Rofiq",
      email,
      password,
      createdAt: new Date().toISOString(),
    };

    const token = jwt.sign({ id: user.id, email: user.email }, "secret", {
      expiresIn: "1h",
    });

    res.cookie("token", token, {
      httpOnly: true, // Keamanan: tidak bisa diakses JavaScript (XSS)
      secure: true, // Hanya dikirim via HTTPS
      sameSite: "strict", // Mencegah serangan CSRF
      maxAge: 60000, // Masa berlaku cookie (1 menit dalam ms)
    });

    res.status(200).json({ message: "Login successfully", data: user, token });
  } catch (error) {
    next(error);
  }
};
