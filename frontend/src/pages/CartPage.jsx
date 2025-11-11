import { Trash2 } from "lucide-react";
import { useCartStore } from "../stores/useCartStore";
import LoadingSpinner from "../components/LoadingSpinner";
import CouponSection from "../components/CouponSection";
import OrderSection from "../components/OrderSection";

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart } =
    useCartStore();

  return (
    <div className="px-30 py-15 flex justify-between max-md:flex-col max-md:px-15">
      <div className="">
        <button
          disabled={cartItems.length === 0}
          onClick={clearCart}
          className={`bg-red-700 text-white font-semibold px-4 py-1 rounded-md mb-4 cursor-pointer ${
            cartItems.length === 0 && "bg-zinc-500"
          }`}
        >
          Clear cart
        </button>
        {cartItems.map((item, i) => (
          <div
            className="bg-zinc-300 w-150 h-35 px-10 py-5 mb-2 rounded-lg flex justify-between relative max-md:flex-col max-md:w-100 max-md:h-75 max-md:items-center"
            key={i}
          >
            <p className="font-semibold text-sm w-20">{item.name}</p>
            <div className="flex flex-col justify-between items-center">
              <p className="font-semibold">{item.price}$</p>
              <div className="flex items-center mt-2">
                <button
                  className="text-white bg-black rounded-l-md px-4 py-1 border-r-1 cursor-pointer"
                  onClick={() => {
                    updateQuantity({
                      productId: item._id,
                      quantity: item.quantity - 1,
                    });
                  }}
                >
                  -
                </button>
                <div className="text-white bg-black py-1 px-3">
                  {item.quantity}
                </div>
                <button
                  className="text-white bg-black rounded-r-md px-4 py-1 border-l-1 cursor-pointer"
                  onClick={() => {
                    updateQuantity({
                      productId: item._id,
                      quantity: item.quantity + 1,
                    });
                  }}
                >
                  +
                </button>
              </div>
            </div>
            <img
              src={item.image}
              className="w-35  h-25 object-cover rounded-md"
              alt=""
            />
            <Trash2
              className="absolute top-3 right-3 cursor-pointer"
              onClick={() => removeFromCart(item._id)}
              size={20}
            />
          </div>
        ))}
      </div>
      <div className="bg-zinc-300 min-w-100 min-h-40 rounded-md px-12 py-8">
        <OrderSection />
        <CouponSection />
      </div>
    </div>
  );
};
export default CartPage;
