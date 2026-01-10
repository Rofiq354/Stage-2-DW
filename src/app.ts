import express from "express";
import productRouter from "./routes/product";
import userRouter from "./routes/user";
import supplierRouter from "./routes/supplier";
import authRouter from "./routes/auth";

const app = express();

app.use(express.json());

app.use("/api/v1", productRouter);
app.use("/api/v1", userRouter);
app.use("/api/v1", supplierRouter);
app.use("/auth", authRouter);

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on localhost:${process.env.PORT || 5000}`);
});
