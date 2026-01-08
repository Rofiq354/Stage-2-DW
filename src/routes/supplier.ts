import express from "express";
import * as supplierController from "../controllers/supplier";

const router = express.Router();

router.post("/suppliers/stock", supplierController.getSupplierStockProducts);
// router.get("/users/:id/points", supplierController.getUsersPoint);

export default router;
