import Coupon from "../models/coupon.model.js";

export const getCoupon = async (req, res) => {
  try {
    const user = req.user;
    const coupon = await Coupon.findOne({ isActive: true, userId: user._id });
    res.status(200).json(coupon || null);
  } catch (error) {
    console.log(`Error in getCoupon controller: ${error.message}`);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const validateCoupon = async (req, res) => {
  try {
    const { code } = req.body;
    const coupon = await Coupon.findOne({
      isActive: true,
      code,
      userId: req.user._id,
    });
    if (coupon.expirationDate < new Date()) {
      coupon.isActive = false;
      await coupon.save();
      return res.status(400).json({ message: "Coupon is expired" });
    }
    res.status(200).json({
      message: "Coupon is valid",
      code: coupon.code,
      discountPercentage: coupon.discountPercentage,
    });
  } catch (error) {
    console.log(`Error in validateCoupon controller: ${error.message}`);
    res.status(500).json({ message: "Internal server error" });
  }
};
