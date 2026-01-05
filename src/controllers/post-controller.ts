// Mengimpor Request dan Response dari express
import { Request, Response } from "express";

// Mengimpor posts dan PostModel dari model
import { posts, PostModel } from "../models/post-model";

// Fungsi untuk mendapatkan semua posts
export const getPosts = (req: Request, res: Response) => {
  // Mengembalikan semua posts dalam format JSON
  res.json(posts);
};

// Fungsi untuk membuat post baru
export const createPost = (req: Request, res: Response) => {
  // Mengambil title dan content dari body request
  const { title, content } = req.body;

  // Membuat ID baru berdasarkan ID terbesar yang ada
  const newId = posts.length > 0 ? Math.max(...posts.map((p) => p.id)) + 1 : 1;

  // Membuat objek post baru
  const newPost: PostModel = {
    id: newId,
    title,
    content,
  };

  // Menambahkan post baru ke array posts
  posts.push(newPost);

  // Mengembalikan response dengan status 201 dan data post baru
  res.status(201).json(newPost);
};

// Fungsi untuk menghapus post berdasarkan ID
export const deletePost = (req: Request, res: Response) => {
  // Mengambil ID dari parameter URL
  const { id } = req.params;

  // Mencari indeks post dengan ID yang cocok
  const postIndex = posts.findIndex((post) => post.id === Number(id));

  // Jika post ditemukan (indeks tidak -1)
  if (postIndex !== -1) {
    // Menghapus post dari array
    posts.splice(postIndex, 1);
    // Mengembalikan response sukses dengan status 200
    res.status(200).json({ message: "Post deleted successfully" });
  } else {
    // Jika post tidak ditemukan, kembalikan error 404
    res.status(404).json({ message: "Post not found" });
  }
};
