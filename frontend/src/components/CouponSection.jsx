import { useEffect, useState } from "react";
import { useCartStore } from "../stores/useCartStore";

const CouponSection = () => {
  const { getCoupon, coupon, applyCoupon, removeCoupon, isCouponApplied } =
    useCartStore();
  const [userInputCode, setUserInputCode] = useState("");

  useEffect(() => {
    getCoupon();
  }, [getCoupon]);

  useEffect(() => {
    if (coupon) setUserInputCode(coupon.code);
  }, [coupon]);


  const handleApplyCoupon = async () => {
    if (!userInputCode) return;
    await applyCoupon(userInputCode);
  };
  const handleRemoveCoupon = async () => {
    await removeCoupon();
    setUserInputCode("");
  };
  return (
    <div className="">
      <div className="flex">
        <input
          className="border-2 rounded-l-md w-48 px-2"
          onChange={(e) => setUserInputCode(e.target.value)}
          value={userInputCode}
        />
        <button
          className="bg-red-700 text-white rounded-r-md py-1 px-4 cursor-pointer focus:outline-0"
          onClick={handleApplyCoupon}
        >
          Apply coupon
        </button>
      </div>
      {isCouponApplied && coupon && (
        <div className="mt-2">
          <p>
            <span className="font-semibold">Applied Coupon:</span> {coupon.code}{" "}
            -{coupon.discountPercentage}% off
          </p>
          <button
            className="cursor-pointer bg-red-700 px-2 py-1 text-white rounded-md mt-1 font-semibold"
            onClick={handleRemoveCoupon}
          >
            Remove Coupon
          </button>
        </div>
      )}
    </div>
  );
};
export default CouponSection;
