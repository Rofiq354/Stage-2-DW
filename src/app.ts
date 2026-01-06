// Mengimpor modul Express untuk membuat server web
import express from "express";

// Membuat instance aplikasi Express
const app = express();

// Mengimpor router untuk produk dan pesanan
import postRouter from "./routes/post";
import userRouter from "./routes/user";

// Menggunakan middleware untuk parsing JSON dalam body request
app.use(express.json());

// Mounting router produk dan pesanan pada path /api/v1
app.use("/api/v1", postRouter);
app.use("/api/v1", userRouter);

// Menjalankan server pada port yang ditentukan dan menampilkan pesan konfirmasi
app.listen(process.env.PORT || 3000, () => {
  console.log(
    `Server is running on http://localhost:${process.env.PORT || 3000}`
  );
});
