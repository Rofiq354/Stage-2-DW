import express from "express";
const app = express();
const PORT = 3000;

import productRouter from "./routes/product-route";
import orderRouter from "./routes/order-route";

app.use(express.json());
app.use("/api/v1", productRouter);
app.use("/api/v1", orderRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
