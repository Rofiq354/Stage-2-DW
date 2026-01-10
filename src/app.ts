import express from "express";
import authRouter from "./routes/auth";
const app = express();

app.use(express.json());
app.use("/auth", authRouter);

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port ${process.env.PORT || 5000}`);
});
