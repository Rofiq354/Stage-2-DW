import { Request, Response } from "express";
import { orders, Order } from "../models/order-model";

export const getOrders = (req: Request, res: Response) => {
  res.json(orders);
};

export const createOrder = (req: Request, res: Response) => {
  let newId: number;

  if (orders.length === 0) {
    newId = 1;
  } else {
    newId = Math.max(...orders.map((order) => order.id)) + 1;
  }

  const order: Order = {
    id: newId,
    productId: req.body.productId,
    quantity: req.body.quantity,
  };
  orders.push(order);
  res.status(201).json(order);
};

export const deleteOrder = (req: Request, res: Response) => {
  const orderId = Number(req.params.id);
  const orderIndex = orders.findIndex((order) => order.id === orderId);
  if (orderIndex === -1) {
    return res.status(404).json({ message: "Order not found" });
  }
  orders.splice(orderIndex, 1);
  res.status(200).json({ message: "Order deleted successfully" });
};
