import express from "express";
import * as ProductController from "../controllers/product";

const router = express.Router();

router.get("/products", ProductController.getProducts);
router.post("/products", ProductController.createProduct);
router.put("/products/:id", ProductController.updateProduct);
router.delete("/products/:id", ProductController.deleteProduct);

export default router;
