// Mengimpor modul express untuk membuat aplikasi web
import express from "express";

// Membuat instance aplikasi Express
const app = express();

// Menggunakan middleware untuk parsing JSON
app.use(express.json());

// Mengimpor router untuk post dari file post-route
import productRouter from "./routes/product";
import orderRouter from "./routes/order";
import transferPointsRouter from "./routes/transfer-points";

// Menggunakan router post dengan prefix /api/v1
app.use("/api/v1", productRouter);
app.use("/api/v1", orderRouter);
app.use("/api/v1", transferPointsRouter);

// Global Error Handler
app.use((err: any, req: any, res: any, next: any) => {
  res.status(err.statusCode || 500).json({
    status: err.status || "error",
    message: err.message || "Internal Server Error",
  });
});

// Memulai server dan mendengarkan pada port yang ditentukan
app.listen(process.env.PORT || 3000, () => {
  // Mencetak pesan ke konsol bahwa server sedang berjalan
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
});
