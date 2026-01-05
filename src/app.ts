// Mengimpor modul express untuk membuat aplikasi web
import express from "express";

// Membuat instance aplikasi Express
const app = express();

// Menggunakan middleware untuk parsing JSON
app.use(express.json());

// Menentukan port tempat server akan berjalan
const PORT = 3000;

// Mengimpor router untuk post dari file post-route
import postRouter from "./routes/post-route";

// Menggunakan router post dengan prefix /api/v1
app.use("/api/v1", postRouter);

// Memulai server dan mendengarkan pada port yang ditentukan
app.listen(PORT, () => {
  // Mencetak pesan ke konsol bahwa server sedang berjalan
  console.log(`Server is running on port ${PORT}`);
});
