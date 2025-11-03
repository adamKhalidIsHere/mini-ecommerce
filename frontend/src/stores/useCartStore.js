import toast from "react-hot-toast";
import { create } from "zustand";
import axios from "../lib/axiosInstance";

export const useCartStore = create((set, get) => ({
  cartItems: [],
  coupon: null,
  isCouponApplied: false,
  subtotal: 0,
  total: 0,
  addToCart: async ({ productId, quantity }, productData) => {
    try {
      await axios.post("/cart/", { productId, quantity });
      set((state) => {
        const existingProduct = state.cartItems.find(
          (item) => item._id === productId
        );

        if (existingProduct) {
          return {
            cartItems: state.cartItems.map((item) =>
              item._id === productId
                ? { ...item, quantity: item.quantity + quantity }
                : item
            ),
          };
        }

        return {
          cartItems: [...state.cartItems, { ...productData, quantity }],
        };
      });
      get().calculateTotals();

      toast.success("Added to cart");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add to cart");
    }
  },

  getCartItems: async () => {
    try {
      const res = await axios.get("/cart/");
      set({ cartItems: res.data });
      get().calculateTotals();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },
  removeFromCart: async (productId) => {
    try {
      await axios.delete(`/cart/${productId}`);
      set((state) => ({
        cartItems: state.cartItems.filter((item) => item._id !== productId),
      }));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },
  updateQuantity: async ({ productId, quantity }) => {
    try {
      await axios.put(`/cart/${productId}`, { quantity });
      if (quantity === 0) {
        get().removeFromCart(productId);
        return;
      }
      set((state) => ({
        cartItems: state.cartItems.map((item) => {
          if (item._id === productId) {
            item.quantity = quantity;
          }
          return item;
        }),
      }));
      get().calculateTotals();
    } catch (error) {
      toast.error(error.response?.data?.message);
      console.log(error.message);
    }
  },
  clearCart: async () => {
    try {
      await axios.delete("/cart/");
      set({ cartItems: [] });
      get().calculateTotals();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },
  getCoupon: async () => {
    try {
      const res = await axios.get("/coupon/");
      set({ coupon: res.data });
      console.log(res.data);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },
  applyCoupon: async (code) => {
    try {
      const response = await axios.post("/coupon/", { code });
      set({ coupon: response.data, isCouponApplied: true });
      get().calculateTotals();
      toast.success("Coupon applied successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to apply coupon");
      console.log(error.message);
    }
  },
  removeCoupon: () => {
    set({ coupon: null, isCouponApplied: false });
    get().calculateTotals();
    toast.success("Coupon removed");
  },
  calculateTotals: () => {
    const { cartItems, coupon, isCouponApplied } = get();
    const subtotal = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    let total = subtotal;

    if (coupon && isCouponApplied) {
      const discount = subtotal * (coupon.discountPercentage / 100);
      total = subtotal - discount;
    }

    set({ subtotal, total });
  },
}));
