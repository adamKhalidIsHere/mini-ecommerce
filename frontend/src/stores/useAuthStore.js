import toast from "react-hot-toast";
import { create } from "zustand";
import axios from "../lib/axiosInstance.js";

export const useAuthStore = create((set, get) => ({
  user: null,
  isLoading: false,
  checkingAuth: true,
  register: async (formData) => {
    set({ isLoading: true });
    try {
      const res = await axios.post("/auth/register", formData);
      set({ user: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isLoading: false });
    }
  },
  login: async (formData) => {
    set({ isLoading: true });
    try {
      const res = await axios.post("/auth/login", formData);
      set({ user: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isLoading: false });
    }
  },
  logout: async () => {
    set({ isLoading: true });
    try {
      await axios.post("/auth/logout");
      set({ user: null });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isLoading: false });
    }
  },
  getProfile: async () => {
    set({ checkingAuth: true });
    try {
      const res = await axios.get("/auth/me");

      set({ user: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ checkingAuth: false });
    }
  },
  refreshToken: async () => {
    if (get().checkingAuth) return;

    set({ checkingAuth: true });
    try {
      const res = await axios.post("/auth/refresh-token", {});
      console.log(res.data.message);
      set({ checkingAuth: false });
    } catch (error) {
      set({ user: null, checkingAuth: false });

      console.error("Failed to refresh:", error.response?.data?.message);
      throw error;
    }
  },
}));
let refreshPromise = null;

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If token expired and we haven't retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        if (!refreshPromise) {
          refreshPromise = useAuthStore.getState().refreshToken();
        }
        await refreshPromise;
        refreshPromise = null;

        // Retry the failed request
        return axios(originalRequest);
      } catch (refreshError) {
        useAuthStore.getState().logout();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
