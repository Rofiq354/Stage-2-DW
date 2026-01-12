import express from "express";
import { createProduct } from "../controllers/product";
import { upload } from "../middlewares/upload-multer";
import { authenticate } from "../middlewares/auth";

const router = express.Router();

router.post(
  "/products/upload-image",
  authenticate,
  upload.single("image"),
  createProduct
);

export default router;
