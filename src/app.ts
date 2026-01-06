// Mengimpor modul express untuk membuat aplikasi web
import express from "express";

// Membuat instance aplikasi Express
const app = express();

// Menggunakan middleware untuk parsing JSON
app.use(express.json());

// Menentukan port tempat server akan berjalan

// Mengimpor router untuk post dari file post-route
import productRouter from "./routes/product";

// Menggunakan router post dengan prefix /api/v1
app.use("/api/v1", productRouter);

// Memulai server dan mendengarkan pada port yang ditentukan
app.listen(process.env.PORT || 3000, () => {
  // Mencetak pesan ke konsol bahwa server sedang berjalan
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
});
