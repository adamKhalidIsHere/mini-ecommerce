import toast from "react-hot-toast";
import axios from "../lib/axiosInstance";
import { useAuthStore } from "../stores/useAuthStore";
import { useCartStore } from "../stores/useCartStore";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = await loadStripe(
  "pk_test_51RNYGvRv07eV2EsoqZjjo2FpjH6TkvbuDuWZP4OOJ74CUaJkE2Ikk33lxRDz5jitKJRrlBsY9FevPp7sim0Ihnla00Ga7r1TKq"
);

const OrderSection = () => {
  const { subtotal, total, coupon, isCouponApplied, cartItems } =
    useCartStore();
  const { user } = useAuthStore();

  const savings = subtotal - total;
  const formattedSavings = savings.toFixed(2);
  const formattedSubtotal = subtotal.toFixed(2);
  const formattedTotal = total.toFixed(2);

  const handlePayment = async () => {
    if (!user) toast.error("You must have an account first!");
    const res = await axios.post("/payment/create-checkout-session", {
      products: cartItems,
      couponCode: coupon ? coupon.code : null,
    });
    const session = res.data;
    window.location.href = session.sessionUrl;
  };
  return (
    <div className="mb-4">
      <div className="space-y-2">
        <div className="flex items-center justify-between gap-4">
          <p className="text-base font-normal ">Original price</p>
          <p className="text-base font-medium ">${formattedSubtotal}</p>
        </div>

        {savings > 0 && (
          <div className="flex items-center justify-between gap-4">
            <p className="text-base font-normal">Savings</p>
            <p className="text-base font-medium">-${formattedSavings}</p>
          </div>
        )}

        {coupon && isCouponApplied && (
          <div className="flex items-center justify-between gap-4">
            <p className="text-base font-normal ">Coupon ({coupon.code})</p>
            <p className="text-base font-medium">
              -{coupon.discountPercentage}%
            </p>
          </div>
        )}
        <div className="flex items-center justify-between gap-4 border-t border-gray-600 pt-2">
          <p className="text-base font-bold ">Total</p>
          <p className="text-base font-bold  ">${formattedTotal}</p>
        </div>
      </div>
      <button
        className="w-full bg-red-700 text-white cursor-pointer py-2 rounded-md font-semibold focus:outline-0 mt-4"
        onClick={handlePayment}
        disabled={!user ? true : false}
      >
        Proceed to checkout
      </button>
    </div>
  );
};
export default OrderSection;
