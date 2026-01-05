// Mengimpor modul express untuk routing
import express from "express";

// Mengimpor semua fungsi dari post-controller
import * as postController from "../controllers/post-controller";

// Membuat instance router Express
const router = express.Router();

// Mendefinisikan rute untuk mendapatkan semua post
router.get("/posts", postController.getPosts);

// Mendefinisikan rute untuk membuat post baru
router.post("/posts", postController.createPost);

// Mendefinisikan rute untuk menghapus post berdasarkan ID
router.delete("/posts/:id", postController.deletePost);

// Mengekspor router sebagai default
export default router;
