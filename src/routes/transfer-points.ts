import express from "express";
import * as transferPointsController from "../controllers/transfer-points";

const router = express.Router();

router.post("/transfer-points", transferPointsController.transferPoints);
router.get("/users/:id/points", transferPointsController.getUsersPoint);

export default router;
