// Mengimpor modul Express untuk membuat server web
import express from "express";

// Membuat instance aplikasi Express
const app = express();

// Mendefinisikan port tempat server akan berjalan
const PORT = 3000;

// Mengimpor router untuk produk dan pesanan
import productRouter from "./routes/product-route";
import orderRouter from "./routes/order-route";

// Menggunakan middleware untuk parsing JSON dalam body request
app.use(express.json());

// Mounting router produk dan pesanan pada path /api/v1
app.use("/api/v1", productRouter);
app.use("/api/v1", orderRouter);

// Menjalankan server pada port yang ditentukan dan menampilkan pesan konfirmasi
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
