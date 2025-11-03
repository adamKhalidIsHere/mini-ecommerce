import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/user.model.js";

const generateTokens = (userId) => {
  const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
  const refreshToken = jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
  return { accessToken, refreshToken };
};

const storeCookies = ({ accessToken, refreshToken }, res) => {
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    maxAge: 15 * 60 * 1000,
    sameSite: "None",
    secure: true,
  });
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    sameSite: "None",
    secure: true,
  });
};

export const register = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    const existingEmail = await User.findOne({ email });
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Email is invalid" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    const { accessToken, refreshToken } = generateTokens(newUser._id);
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    newUser.refreshToken = hashedRefreshToken;
    await newUser.save();
    storeCookies({ accessToken, refreshToken }, res);
    return res.status(200).json({
      user: {
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.log(`Error in register controller: ${error.message}`);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const { accessToken, refreshToken } = generateTokens(user._id);

    user.refreshToken = await bcrypt.hash(refreshToken, 10);
    await user.save();

    storeCookies({ accessToken, refreshToken }, res);
    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    console.log(`Error in login controller: ${error.message}`);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const logout = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.refreshToken = "";
    await user.save();

    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");

    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log(`Error in logout controller: ${error.message}`);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getProfile = async (req, res) => {
  try {
    res.json(req.user);
  } catch (error) {
    console.log(`Error in getProfile controller: ${error.message}`);

    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const refreshToken = async (req, res) => {
  try {
    const token = req.cookies.refreshToken;

    if (!token) {
      return res.status(401).json({ message: "No refresh token provided" });
    }

    // Verify the refresh token
    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }

    // Compare stored hash
    const isValid = await bcrypt.compare(token, user.refreshToken);
    if (!isValid) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }

    // Generate new tokens
    const newTokens = generateTokens(user._id);
    user.refreshToken = await bcrypt.hash(newTokens.refreshToken, 10);
    await user.save();

    // Send new cookies
    storeCookies(newTokens, res);

    return res.status(200).json({ message: "Token refreshed successfully" });
  } catch (error) {
    console.error("Error refreshing token:", error.message);
    return res
      .status(401)
      .json({ message: "Invalid or expired refresh token" });
  }
};
