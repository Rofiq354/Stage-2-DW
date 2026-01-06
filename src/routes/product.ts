// Mengimpor modul express untuk routing
import express from "express";

// Mengimpor semua fungsi dari post-controller
import * as productController from "../controllers/product";

// Membuat instance router Express
const router = express.Router();

// Mendefinisikan rute untuk mendapatkan semua post
router.get("/products", productController.getProducts);

// Mendefinisikan rute untuk membuat post baru
router.post("/product", productController.createProduct);

// Mendefinisikan rute untuk mengupdate post berdasarkan ID
router.put("/product/:id", productController.updateProduct);

// Mendefinisikan rute untuk menghapus post berdasarkan ID
router.delete("/product/:id", productController.deleteProduct);

// Mengekspor router sebagai default
export default router;
