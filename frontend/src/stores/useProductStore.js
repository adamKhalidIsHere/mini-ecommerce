import { create } from "zustand";
import toast from "react-hot-toast";
import axios from "../lib/axiosInstance";

export const useProductStore = create((set, get) => ({
  products: [],
  categories: [],
  featuredProducts: [],
  categoryProducts: [],
  isGettingFeaturedProducts: false,

  getProducts: async () => {
    set({ isLoading: true });
    try {
      const res = await axios.get("/product/");
      set({ products: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isLoading: false });
    }
  },
  getProductsByCategory: async (category) => {
    set({ isLoading: true });
    try {
      const res = await axios.get(`/product/${category}`);
      set({ categoryProducts: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isLoading: false });
    }
  },
  getFeaturedProducts: async () => {
    set({ isGettingFeaturedProducts: true });
    try {
      const res = await axios.get("/product/featured");

      set({ featuredProducts: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isGettingFeaturedProducts: false });
    }
  },
  createProduct: async (productData) => {
    set({ isLoading: true });
    try {
      const res = await axios.post(`/product/`, productData);
      set((state) => {
        return { products: [...state.products, res.data.product] };
      });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isLoading: false });
    }
  },
  deleteProduct: async (productId) => {
    set({ isLoading: true });
    try {
      await axios.delete(`/product/${productId}`);
      set((state) => {
        return {
          products: state.products.filter(
            (product) => product._id !== productId
          ),
        };
      });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isLoading: false });
    }
  },
  editProduct: async (productId, productData) => {
    set({ isLoading: true });
    try {
      const res = await axios.patch(`/product/${productId}`, productData);
      set((state) => {
        const products = (state.products || []).map((product) =>
          product._id === productId ? res.data.product : product
        );
        return {
          products,
        };
      });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isLoading: false });
    }
  },
  toggleFeaturedProduct: async (productId) => {
    set({ isLoading: true });
    try {
      await axios.patch(`/product/${productId}/featured`);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isLoading: false });
    }
  },
  getCategories: () => {
    const products = get().products;

    const categoriesMap = new Map();

    for (const product of products) {
      // If the category doesn't exist yet, store it
      if (!categoriesMap.has(product.category)) {
        categoriesMap.set(product.category, {
          category: product.category,
          image: product.image,
        });
      }
    }

    const categories = Array.from(categoriesMap.values());


    set({ categories: categories });
  },
}));
