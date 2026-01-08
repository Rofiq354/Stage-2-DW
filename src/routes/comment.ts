// Mengimpor modul Express dan controller untuk postingan
import express from "express";
import * as commentController from "../controllers/comment";

// Membuat router Express untuk menangani rute postingan
const router = express.Router();

router.get("/posts/:id/comments", commentController.getCommentsByPostId);
router.get("/posts/comments-summary", commentController.getTotalComments);
router.get(
  "/posts/comments-summary/detail",
  commentController.getCommentsSummary
);
router.get("/users/:id/comments", commentController.getCommentsByUserId);

// Mengekspor router agar dapat digunakan di aplikasi utama
export default router;
