import express from "express";
import * as productController from "../controllers/product-controller";

const router = express.Router();

router.get("/products", productController.getProducts);
router.post("/products", productController.createProduct);
router.delete("/products/:id", productController.deleteProduct);

export default router;
