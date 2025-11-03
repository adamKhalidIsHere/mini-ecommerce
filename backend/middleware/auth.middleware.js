import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
  try {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
      return res
        .status(401)
        .json({ message: "Unauthorized - No token provided" });
    }
    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized - Invalid token" });
    }
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized - Invalid token" });
  }
};

export const adminRoute = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Forbidden - Admins only" });
  }
  next();
};

