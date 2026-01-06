// Mengimpor tipe Request dan Response dari Express, serta model products dan Product
import { Request, Response } from "express";
import { prisma } from "../connections/client";

/**
 * Mendapatkan semua postingan
 * @returns Promise<Response>
 */
export const getPosts = async (req: Request, res: Response) => {
  try {
    const posts = await prisma.post.findMany();
    res.status(200).json([{ message: "success", data: posts }]);
  } catch (error) {
    res.status(500).json({ message: "error", data: error });
  }
};

/**
 * Membuat postingan baru
 * @param {Request} req - Request Express
 * @param {Response} res - Response Express
 * @returns Promise<Response>
 */
/**
 * Contoh request body:
 * {
 *   "title": "Judul Postingan",
 *   "content": "Isi postingan",
 *   "published": true,
 *   "authorId": 1
 * }
 */

export const createPost = async (req: Request, res: Response) => {
  try {
    const { title, content, published, authorId } = req.body;

    const post = await prisma.post.create({
      data: {
        title,
        content,
        published,
        authorId: Number(authorId),
      },
    });

    res.status(201).json([{ message: "Post created", data: post }]);
  } catch (error) {
    res.status(500).json({ message: "error", data: error });
  }
};

/**
 * Memperbarui postingan berdasarkan ID
 * @param {Request} req - Request Express
 * @param {Response} res - Response Express
 * @returns Promise<Response>
 */
/**
 * Contoh request body:
 * {
 *   "title": "Judul Postingan yang diperbarui",
 *   "content": "Isi postingan yang diperbarui",
 *   "published": true
 * }
 */
export const updatePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, content, published } = req.body;

    const post = await prisma.post.update({
      where: {
        id: Number(id),
      },
      data: {
        title,
        content,
        published,
      },
    });

    res.status(200).json([{ message: "Post updated", data: post }]);
  } catch (error) {
    res.status(500).json([{ message: "error", data: error }]);
  }
};

/**
 * Menghapus postingan berdasarkan ID
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
export const deletePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const post = await prisma.post.delete({
      where: {
        id: Number(id),
      },
    });

    res.status(200).json([{ message: "Post deleted", data: post }]);
  } catch (error) {
    res.status(500).json([{ message: "error", data: error }]);
  }
};
