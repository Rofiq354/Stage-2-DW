import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import { prisma } from "../db/client";
import { UserRole } from "@prisma/client";
import { loginSchema, registerSchema } from "../validations/auth";
import { signToken } from "../utils/jwt";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { error } = registerSchema.validate(req.body);

    if (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
      return;
    }

    const { username, email, password, isSupplier } = req.body;

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashPassword,
        role: isSupplier ? UserRole.SUPPLIER : UserRole.USER,
        ...(isSupplier && {
          supplier: {
            create: {
              company: "PT. Seribu Bahasa",
            },
          },
        }),
      },
    });

    // if (isSupplier) {
    //   const supplier = await prisma.supplier.create({
    //     data: {
    //       userId: user.id,
    //       company: "mantap",
    //     },
    //   });
    // }

    const data = {
      id: user.id,
      username,
      email,
      password,
      role: user.role,
    };

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { error } = loginSchema.validate(req.body);

    if (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
      return;
    }

    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      res.status(400).json({
        success: false,
        message: "User not found",
      });

      return;
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      res.status(400).json({
        success: false,
        message: "Invalid password",
      });
      return;
    }

    const token = signToken({ id: user.id, role: user.role });

    const data = {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    };

    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      data,
      token,
    });
  } catch (error) {
    next(error);
  }
};
