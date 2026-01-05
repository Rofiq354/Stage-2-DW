import { Request, Response } from "express";
import { products, Product } from "../models/product-model";

export const getProducts = (req: Request, res: Response) => {
  res.json(products);
};

export const createProduct = (req: Request, res: Response) => {
  // Menghasilkan ID unik untuk produk baru
  let newId: number;
  if (products.length === 0) {
    // Jika array products kosong, mulai dari ID 1
    newId = 1;
  } else {
    // Jika ada data, ambil ID terbesar dan tambah 1
    newId = Math.max(...products.map((p) => p.id)) + 1;
  }

  // Membuat objek produk dengan ID yang dihasilkan dan data dari body request
  const product: Product = {
    id: newId,
    name: req.body.name,
    price: req.body.price,
  };

  // Menambahkan produk baru ke array products
  products.push(product);

  // Mengembalikan produk yang dibuat dengan status 201
  res.status(201).json(product);
};

// Fungsi untuk menghapus produk berdasarkan ID
export const deleteProduct = (req: Request, res: Response) => {
  // Mendapatkan ID produk dari parameter request
  const productId = req.params.id;

  // Mencari indeks produk dengan ID yang cocok
  const productIndex = products.findIndex(
    (product) => product.id === Number(productId)
  );

  // Memeriksa apakah produk ada
  if (productIndex === -1) {
    // Jika produk tidak ditemukan, kembalikan error 404
    return res.status(404).json({ message: "Product not found" });
  }

  // Menghapus produk dari array
  products.splice(productIndex, 1);

  // Mengembalikan pesan sukses
  res.status(200).json({ message: "Product deleted successfully" });
};
