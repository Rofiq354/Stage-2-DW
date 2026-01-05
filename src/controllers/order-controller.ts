// Mengimpor tipe Request dan Response dari Express, serta model orders dan Order
import { Request, Response } from "express";
import { orders, Order } from "../models/order-model";

// Fungsi untuk mendapatkan semua pesanan
export const getOrders = (req: Request, res: Response) => {
  res.json(orders);
};

// Fungsi untuk membuat pesanan baru
export const createOrder = (req: Request, res: Response) => {
  // Menentukan ID baru untuk pesanan
  let newId: number;

  if (orders.length === 0) {
    newId = 1;
  } else {
    newId = Math.max(...orders.map((order) => order.id)) + 1;
  }

  // Membuat objek pesanan baru
  const order: Order = {
    id: newId,
    productId: req.body.productId,
    quantity: req.body.quantity,
  };
  // Menambahkan pesanan ke array orders
  orders.push(order);
  // Mengirim respons dengan status 201 dan data pesanan
  res.status(201).json(order);
};

// Fungsi untuk menghapus pesanan berdasarkan ID
export const deleteOrder = (req: Request, res: Response) => {
  // Mengambil ID pesanan dari parameter URL
  const orderId = Number(req.params.id);
  // Mencari indeks pesanan dalam array
  const orderIndex = orders.findIndex((order) => order.id === orderId);
  // Jika pesanan tidak ditemukan, kirim respons 404
  if (orderIndex === -1) {
    return res.status(404).json({ message: "Order not found" });
  }
  // Menghapus pesanan dari array
  orders.splice(orderIndex, 1);
  // Mengirim respons sukses
  res.status(200).json({ message: "Order deleted successfully" });
};
