// Mengimpor tipe Request dan Response dari Express, serta model orders dan Order
import { Request, Response } from "express";
import { prisma } from "../connections/client";

/**
 * Mendapatkan semua user
 * @returns Promise<Response>
 */
export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json([{ message: "success", data: users }]);
  } catch (error) {
    res.status(500).json({ message: "error", data: error });
  }
};

/**
 * Membuat user baru
 * @param {Request} req - Request Express
 * @param {Response} res - Response Express
 * @returns Promise<Response>
 */
/**
 * Contoh request body:
 * {
 *   "email": "user@example.com",
 *   "name": "User Example"
 * }
 */
export const createUser = async (req: Request, res: Response) => {
  try {
    const { email, name } = req.body;

    const user = await prisma.user.create({
      data: {
        email,
        name,
      },
    });

    res.status(201).json([{ message: "User created", data: user }]);
  } catch (error) {
    res.status(500).json({ message: "error", data: error });
  }
};

/**
 * Memperbarui user berdasarkan ID
 * @param {Request} req - Request Express
 * @param {Response} res - Response Express
 * @returns Promise<Response>
 */
/**
 * Contoh request body:
 * {
 *   "email": "user@example.com",
 *   "name": "User Example"
 * }
 */
export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { email, name } = req.body;

    const user = await prisma.user.update({
      where: {
        id: Number(id),
      },
      data: {
        email,
        name,
      },
    });

    res.status(200).json([{ message: "User updated", data: user }]);
  } catch (error) {
    res.status(500).json({ message: "error", data: error });
  }
};

/**
 * Menghapus user berdasarkan ID
 * @param {Request} req - Request Express
 * @param {Response} res - Response Express
 * @returns Promise<Response>
 */
/**
 * Contoh request body:
 * {
 *   "id": 1
 * }
 */

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const user = await prisma.user.delete({
      where: {
        id: Number(id),
      },
    });

    res.status(200).json([{ message: "User deleted", data: user }]);
  } catch (error) {
    res.status(500).json({ message: "error", data: error });
  }
};
