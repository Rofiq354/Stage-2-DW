import express from "express";
import * as orderController from "../controllers/order-controller";

const router = express.Router();

router.get("/orders", orderController.getOrders);
router.post("/orders", orderController.createOrder);
router.delete("/orders/:id", orderController.deleteOrder);

export default router;
