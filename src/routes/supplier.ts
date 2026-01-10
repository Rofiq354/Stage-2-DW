import express from "express";
import * as SupplierController from "../controllers/supplier";
import * as ProductController from "../controllers/product";
import { authenticate, authRoleMiddleware } from "../middlewares/auth";

const router = express.Router();

router.get("/suppliers", SupplierController.getSuppliers);
router.get(
  "/suppliers/products",
  authenticate,
  authRoleMiddleware("SUPPLIER"),
  ProductController.getProducts
);
router.post(
  "/suppliers/products",
  authenticate,
  authRoleMiddleware("SUPPLIER"),
  ProductController.createProduct
);

export default router;
