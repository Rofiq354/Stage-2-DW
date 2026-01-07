// Import Express Router
import { Router } from "express";

// Import the controller function
import { getOrderSummary } from "../controllers/order";

// Create a new router instance
const router = Router();

// Define the /summary endpoint
router.get("/orders/summary", getOrderSummary);

// Export the router
export default router;
