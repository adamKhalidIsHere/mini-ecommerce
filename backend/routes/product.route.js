import express from "express";
import {
  getAllProducts,
  createProduct,
  deleteProduct,
  toggleFeaturedProduct,
  getProductsByCategory,
  editProduct,
  getFeaturedProducts,
} from "../controllers/product.controller.js";
import { protectRoute, adminRoute } from "../middleware/auth.middleware.js";

const router = express.Router();
const adminOnly = [protectRoute, adminRoute];

router.get("/", getAllProducts);
router.get("/featured", getFeaturedProducts);
router.get("/:category", getProductsByCategory);

router.post("/", adminOnly, createProduct);
router.delete("/:productId", adminOnly, deleteProduct);
router.patch("/:productId", adminOnly, editProduct);
router.patch("/:productId/featured", adminOnly, toggleFeaturedProduct);

export default router;
