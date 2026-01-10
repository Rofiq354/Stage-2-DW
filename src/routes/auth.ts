import express from "express";

import { authenticate } from "../middlewares/auth";
import { handleLogin, handleRegister } from "../controllers/auth";

const router = express.Router();

router.post("/register", handleRegister);
router.post("/login", handleLogin);

router.get("/me", authenticate, (req, res) => {
  res.json({ message: "Protected route" });
});

export default router;
