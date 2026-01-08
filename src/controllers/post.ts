// Mengimpor tipe Request dan Response dari Express, serta model products dan Product
import { Request, Response } from "express";
import { prisma } from "../connections/client";

/**
 * Mendapatkan semua postingan
 * @param {Request} req - Request Express
 * @param {Response} res - Response Express
 * @returns Promise<Response>
 */
/**
 * Contoh request query:
 * /posts?category=technology&page=1&limit=10
 */
export const getPosts = async (req: Request, res: Response) => {
  const {
    /**
     * Kategori postingan yang ingin diambil
     * Contoh: technology
     */
    category,
    /**
     * Halaman yang ingin diambil
     * Contoh: 1
     */
    page: paginationPage = 1,
    /**
     * Jumlah postingan yang ingin diambil per halaman
     * Contoh: 10
     */
    limit: paginationLimit = 10,
  } = req.query;

  let whereClause: any = {};
  if (category) {
    whereClause.categories = {
      some: {
        name: category as string,
      },
    };
  }

  try {
    const totalPosts = await prisma.post.count({ where: whereClause });
    const posts = await prisma.post.findMany({
      where: whereClause,
      skip: (Number(paginationPage) - 1) * Number(paginationLimit),
      take: Number(paginationLimit),
      include: {
        author: true,
        categories: true,
      },
    });

    res.status(200).json({
      success: true,
      message: "posts retrieved successfully",
      data: posts,
      pagination: {
        total: totalPosts,
        page: Number(paginationPage),
        limit: Number(paginationLimit),
        totalPages: Math.ceil(totalPosts / Number(paginationLimit)),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "error",
      data: error,
    });
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
 *   "title": "Judul Postingan yang Baru",
 *   "content": "Isi postingan yang baru",
 *   "published": true,
 *   "authorId": 1
 * }
 */
export const createPost = async (req: Request, res: Response) => {
  try {
    // Mendapatkan data dari request body
    const { title, content, published, authorId } = req.body;

    // Membuat postingan baru dengan data yang diperoleh
    const post = await prisma.post.create({
      data: {
        title,
        content,
        published,
        authorId: Number(authorId), // Convert authorId to number
      },
    });

    // Mengembalikan respon dengan status 201 dan data postingan yang baru dibuat
    res.status(201).json([{ message: "Post created", data: post }]);
  } catch (error) {
    // Mengembalikan respon dengan status 500 dan error message
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
 *   "title": "Judul Postingan yang Diperbarui",
 *   "content": "Isi postingan yang diperbarui",
 *   "published": true
 * }
 */
export const updatePost = async (req: Request, res: Response) => {
  try {
    // Mendapatkan ID postingan dari parameter request
    const { id } = req.params;

    // Mendapatkan data yang ingin diperbarui dari request body
    const { title, content, published } = req.body;

    // Memperbarui postingan berdasarkan ID dan data yang diperoleh
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

    // Mengembalikan respon dengan status 200 dan data postingan yang diperbarui
    res.status(200).json([{ message: "Post updated", data: post }]);
  } catch (error) {
    // Mengembalikan respon dengan status 500 dan error message
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
    // Mendapatkan ID postingan dari parameter request
    const { id } = req.params;

    // Menghapus postingan berdasarkan ID
    const post = await prisma.post.delete({
      where: {
        id: Number(id), // Convert id to number
      },
    });

    // Mengembalikan respon dengan status 200 dan data postingan yang dihapus
    res.status(200).json([{ message: "Post deleted", data: post }]);
  } catch (error) {
    // Mengembalikan respon dengan status 500 dan error message
    res.status(500).json([{ message: "error", data: error }]);
  }
};
