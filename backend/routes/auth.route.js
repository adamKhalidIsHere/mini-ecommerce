import express from "express";
import {
  getProfile,
  login,
  logout,
  refreshToken,
  register,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", protectRoute, logout);
router.get("/me", protectRoute, getProfile);
router.post("/refresh-token", refreshToken);

export default router;
