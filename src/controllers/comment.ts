import { Request, Response } from "express";
import { prisma } from "../connections/client";


/**
 * Mendapatkan semua komentar yang dibuat untuk postingan dengan ID tertentu
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
export const getCommentsByPostId = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { page = 1, limit = 10 } = req.query;

    // Mendapatkan semua komentar yang dibuat untuk postingan dengan ID tertentu
    const comments = await prisma.comment.findMany({
      where: {
        postId: Number(id),
      },
      select: {
        id: true,
        content: true,
        authorId: true,
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      skip: (Number(page) - 1) * Number(limit),
      take: Number(limit),
    });

    // Mendapatkan total jumlah komentar yang dibuat untuk postingan dengan ID tertentu
    const total = await prisma.comment.count({ where: { postId: Number(id) } });

    res.status(200).json({
      success: true,
      message: "comments retrieved successfully",
      data: comments,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / Number(limit)),
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "error", data: error });
  }
};


/**
 * Mendapatkan ringkasan semua postingan dengan jumlah komentar untuk setiap postingan
 * @param {Request} req - Request Express
 * @param {Response} res - Response Express
 * @returns Promise<Response>
 */
export const getTotalComments = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    // Mendapatkan postingan dengan jumlah komentar untuk setiap postingan
    const posts = await prisma.post.findMany({
      skip: (Number(page) - 1) * Number(limit),
      take: Number(limit),
      select: {
        id: true,
        title: true,
        content: true,
        published: true,
        authorId: true,
        author: true,
        // Mendapatkan jumlah komentar untuk setiap postingan
        _count: {
          select: { comments: true },
        },
      },
    });

    // Membuat data yang akan dikembalikan
    const result = posts.map((p) => ({
      postId: p.id,
      title: p.title,
      content: p.content,
      published: p.published,
      authorId: p.authorId,
      author: p.author,
      // Jumlah komentar untuk setiap postingan
      totalComments: p._count.comments,
    }));

    // Mengembalikan data dengan pagination
    res.status(200).json([
      {
        success: true,
        message: "posts with comments summary successfully",
        data: result,
        pagination: {
          total: await prisma.post.count(),
          page: Number(page),
          limit: Number(limit),
          totalPages: Math.ceil((await prisma.post.count()) / Number(limit)),
        },
      },
    ]);
  } catch (error) {
    res.status(500).json({ success: false, message: "error", data: error });
  }
};


/**
 * Mendapatkan ringkasan semua komentar untuk setiap postingan
 * @param {Request} req - Request Express
 * @param {Response} res - Response Express
 * @returns Promise<Response>
 */
export const getCommentsSummary = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10, minComments } = req.query;

    // Mendapatkan jumlah komentar untuk setiap postingan
    const posts = await prisma.comment.groupBy({
      by: ["postId"],
      _count: {
        postId: true,
      },
      having: {
        postId: {
          _count: {
            gt: (Number(minComments) || 0) - 1,
          },
        },
      },
    });

    // Mendapatkan komentar untuk postingan yang memenuhi syarat
    const comments = await prisma.comment.findMany({
      where: {
        postId: {
          in: posts.map((p) => p.postId),
        },
      },
      skip: (Number(page) - 1) * Number(limit),
      take: Number(limit),
    });

    // Mendapatkan total jumlah komentar
    const totalComments = await prisma.comment.count({
      where: {
        postId: {
          in: posts.map((p) => p.postId),
        },
      },
    });

    res.status(200).json([
      {
        success: true,
        message: "all comments summary successfully",
        data: comments,
        pagination: {
          total: totalComments,
          page: Number(page),
          limit: Number(limit),
          totalPages: Math.ceil(totalComments / Number(limit)),
        },
      },
    ]);
  } catch (error) {
    res.status(500).json({ success: false, message: "error", data: error });
  }
};

/**
 * Mendapatkan semua komentar yang dibuat oleh user dengan ID tertentu
 * @param {Request} req - Request Express
 * @param {Response} res - Response Express
 * @returns Promise<Response>
 */
export const getCommentsByUserId = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { page = 1, limit = 10 } = req.query;

    // Mendapatkan semua komentar yang dibuat oleh user dengan ID tertentu
    const comments = await prisma.comment.findMany({
      where: {
        authorId: Number(id),
      },
      select: {
        id: true,
        content: true,
        postId: true,
        post: {
          select: {
            id: true,
            title: true,
            content: true,
            published: true,
          },
        },
      },
      skip: (Number(page) - 1) * Number(limit),
      take: Number(limit),
    });

    // Mendapatkan total jumlah komentar yang dibuat oleh user dengan ID tertentu
    const total = await prisma.comment.count({
      where: { authorId: Number(id) },
    });

    // Mengembalikan data dengan pagination
    res.status(200).json({
      success: true,
      message: "comments retrieved successfully",
      data: comments,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / Number(limit)),
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "error", data: error });
  }
};
