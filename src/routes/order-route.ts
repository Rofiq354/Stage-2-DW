// Mengimpor modul Express dan controller untuk pesanan
import express from "express";
import * as orderController from "../controllers/order-controller";

// Membuat router Express untuk menangani rute pesanan
const router = express.Router();

// Mendefinisikan rute GET untuk mendapatkan semua pesanan
router.get("/orders", orderController.getOrders);
// Mendefinisikan rute POST untuk membuat pesanan baru
router.post("/orders", orderController.createOrder);
// Mendefinisikan rute DELETE untuk menghapus pesanan berdasarkan ID
router.delete("/orders/:id", orderController.deleteOrder);

// Mengekspor router agar dapat digunakan di aplikasi utama
export default router;
