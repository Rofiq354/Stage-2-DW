// Mengimpor modul Express dan controller untuk postingan
import express from "express";
import * as postsController from "../controllers/post";

// Membuat router Express untuk menangani rute postingan
const router = express.Router();

// Mendefinisikan rute GET untuk mendapatkan semua postingan
router.get("/posts", postsController.getPosts);
// Mendefinisikan rute POST untuk membuat postingan baru
router.post("/post", postsController.createPost);
// Mendefinisikan rute PUT untuk memperbarui postingan berdasarkan ID
router.put("/post/:id", postsController.updatePost);
// Mendefinisikan rute DELETE untuk menghapus postingan berdasarkan ID
router.delete("/post/:id", postsController.deletePost);

// Mengekspor router agar dapat digunakan di aplikasi utama
export default router;
