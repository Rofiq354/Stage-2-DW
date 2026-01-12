import express from "express";
import productRouter from "./routes/product";
import authRouter from "./routes/auth";
import multer from "multer";
const app = express();

app.use(express.json());
app.use("/public", express.static("public"));

app.use("/", productRouter);
app.use("/auth", authRouter);

app.use((err: any, req: any, res: any, next: any) => {
  if (err instanceof multer.MulterError) {
    // Error Multer ketika upload file terlalu besar (500 kb)
    if (err.code === "LIMIT_FILE_SIZE") {
      return res
        .status(400)
        .json({ message: "Ukuran file terlalu besar. Maksimal 500 KB." });
    }
    // Error Multer lainnya
    return res.status(400).json({ message: err.message });
  } else if (err) {
    // Error umum lainnya (termasuk dari fileFilter kustom)
    return res.status(500).json({ message: err.message });
  }
  next();
});

app.listen(3000, () =>
  console.log("Server is running on http://127.0.0.1:3000")
);
