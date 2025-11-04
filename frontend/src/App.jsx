import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import { Toaster } from "react-hot-toast";
import Login from "./pages/Login";
import { useEffect } from "react";
import { useAuthStore } from "./stores/useAuthStore";
import LoadingSpinner from "./components/LoadingSpinner";
import HomePage from "./pages/HomePage";
import Dashboard from "./pages/Dashboard";
import { useProductStore } from "./stores/useProductStore";
import CategoryPage from "./pages/CategoryPage";
import CartPage from "./pages/CartPage";
import { useCartStore } from "./stores/useCartStore";
import SuccessCheckout from "./pages/SuccessCheckout";
import CancelCheckout from "./pages/CancelCheckout";

function App() {
  const { getProfile, checkingAuth, user, refreshToken } = useAuthStore();
  const { getProducts } = useProductStore();
  const { getCartItems } = useCartStore();
  useEffect(() => {
    getProfile();
  }, [getProfile, refreshToken]);
  useEffect(() => {
    getProducts();
  }, [getProducts]);
  useEffect(() => {
    if (!user) return;
    getCartItems();
  }, [getCartItems, user]);

  if (checkingAuth) return <LoadingSpinner />;

  return (
    <>
      <Navbar />
      <div className="bg-zinc-200 min-h-[calc(100vh-56px)] w-full">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/register"
            element={!user ? <Register /> : <Navigate to={"/"} />}
          />
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to={"/"} />}
          />
          <Route
            path="/secret-dashboard"
            element={
              user?.role === "admin" ? <Dashboard /> : <Navigate to={"/"} />
            }
          />
          <Route path="/category/:category" element={<CategoryPage />} />
          <Route
            path="/cart"
            element={user ? <CartPage /> : <Navigate to={"/login"} />}
          />
          <Route
            path="/purchase-success"
            element={user ? <SuccessCheckout /> : <Navigate to={"/login"} />}
          />
          <Route
            path="/purchase-cancel"
            element={user ? <CancelCheckout /> : <Navigate to={"/login"} />}
          />
        </Routes>
      </div>
      <Toaster />
    </>
  );
}

export default App;
