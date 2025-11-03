import { ShoppingBag, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../stores/useAuthStore";
import { useCartStore } from "../stores/useCartStore";

const Navbar = () => {
  const { user, logout } = useAuthStore();
  const { cartItems } = useCartStore();
  return (
    <div className="flex bg-red-800 px-30 max-sm:px-10 py-4 justify-between text-white ">
      <Link to={"/"} className="flex ">
        <ShoppingBag />
        <p className="ml-2">E-commerce</p>
      </Link>
      <div className="flex">
        {user && (
          <div className=" flex items-center">
            <Link to={"/cart"} className="relative">
              <ShoppingCart className="cursor-pointer" />
              <span className="absolute -right-3 -top-3 bg-zinc-700 text-white w-5 h-5 flex justify-center items-center rounded-full">
                {cartItems.length}
              </span>
            </Link>
            <button
              className="cursor-pointer ml-5 bg-white text-black px-2 py-0.5 rounded-md text-sm"
              onClick={logout}
            >
              Logout
            </button>
            {user.role === "admin" && (
              <Link
                className="ml-2 bg-white text-black px-2 py-0.5 rounded-md text-sm"
                to={"/secret-dashboard"}
              >
                Dashboard
              </Link>
            )}
          </div>
        )}
        {!user && (
          <>
            <Link
              className=" bg-white text-black px-2 py-0.5 rounded-md text-sm"
              to={"/login"}
            >
              Login
            </Link>
            <Link
              className="ml-2 bg-white text-black px-2 py-0.5 rounded-md text-sm"
              to={"/register"}
            >
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
};
export default Navbar;
