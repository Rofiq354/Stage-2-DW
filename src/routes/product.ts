import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import { createProduct } from "../controllers/product";
import { upload } from "../middlewares/upload-multer";
import { authenticate } from "../middlewares/auth";

const router = express.Router();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 2, // limit each IP to 100 requests per windowMs
  standardHeaders: "draft-8", // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  ipv6Subnet: 56, // Set to 60 or 64 to be less aggressive, or 52 or 48 to be more aggressive
});

router.post(
  "/products/upload-image",
  cors({ origin: "http://localhost:5015", optionsSuccessStatus: 200 }),
  authenticate,
  limiter,
  upload.single("image"),
  createProduct
);

export default router;
