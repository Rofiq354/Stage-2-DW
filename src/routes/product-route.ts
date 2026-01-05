// Mengimpor modul Express dan controller untuk produk
import express from "express";
import * as productController from "../controllers/product-controller";

// Membuat router Express untuk menangani rute produk
const router = express.Router();

// Mendefinisikan rute GET untuk mendapatkan semua produk
router.get("/products", productController.getProducts);
// Mendefinisikan rute POST untuk membuat produk baru
router.post("/products", productController.createProduct);
// Mendefinisikan rute DELETE untuk menghapus produk berdasarkan ID
router.delete("/products/:id", productController.deleteProduct);

// Mengekspor router agar dapat digunakan di aplikasi utama
export default router;
