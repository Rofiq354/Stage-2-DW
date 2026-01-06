// Mengimpor modul Express dan controller untuk user
import express from "express";
import * as userController from "../controllers/user";

// Membuat router Express untuk menangani rute user
const router = express.Router();

// Mendefinisikan rute GET untuk mendapatkan semua user
router.get("/users", userController.getUsers);
// Mendefinisikan rute POST untuk membuat user baru
router.post("/user", userController.createUser);
// Mendefinisikan rute PUT untuk memperbarui user berdasarkan ID
router.put("/user/:id", userController.updateUser);
// Mendefinisikan rute DELETE untuk menghapus user berdasarkan ID
router.delete("/user/:id", userController.deleteUser);

// Mengekspor router agar dapat digunakan di aplikasi utama
export default router;
