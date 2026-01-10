import express from "express";
import * as UserController from "../controllers/user";

const router = express.Router();

router.get("/users", UserController.getUsers);
router.delete("/users/:id", UserController.deleteUser);

export default router;
