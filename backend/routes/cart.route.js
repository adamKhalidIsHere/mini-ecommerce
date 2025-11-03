import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  addToCart,
  clearCart,
  getCartItems,
  removeFromCart,
  updateQuantity,
} from "../controllers/cart.controller.js";

const router = express.Router();

router.get("/", protectRoute, getCartItems);
router.post("/", protectRoute, addToCart);
router.put("/:productId", protectRoute, updateQuantity);
router.delete("/:productId", protectRoute, removeFromCart);
router.delete("/", protectRoute, clearCart);

export default router;
