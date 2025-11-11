import { useEffect, useState } from "react";
import { useCartStore } from "../stores/useCartStore";
import axios from "../lib/axiosInstance";
import { Link } from "react-router-dom";

const SuccessCheckout = () => {
  const [isProcessing, setIsProcessing] = useState(true);
	const { clearCart } = useCartStore();
	const [error, setError] = useState(null);

	useEffect(() => {
		const handleCheckoutSuccess = async (sessionId) => {
			try {
				await axios.post("/payments/checkout-success", {
					sessionId,
				});
				clearCart();
				
			} catch (error) {
				console.log(error);
			} finally {
				setIsProcessing(false);
			}
		};

		const sessionId = new URLSearchParams(window.location.search).get("session_id");
		if (sessionId) {
			handleCheckoutSuccess(sessionId);
		} else {
			setIsProcessing(false);
			setError("No session ID found in the URL");
		}
	}, [clearCart]);

	if (isProcessing) return "Processing...";

	if (error) return `Error: ${error}`;
  return (
    <div className="w-full min-h-[calc(100vh-56px)] flex items-center justify-center">
      <div className="bg-zinc-300  rounded-md px-15 py-10  ">
        <h1 className="text-2xl font-bold  text-center mb-4">Order is taken successfully</h1>
        <div className="">
          <span className="font-semibold">Order Number: </span>
          <span>#1</span>
        </div>
        <div className="">
          <span className="font-semibold">Estimated delivery: </span>
          <span>3-5 days</span>
        </div>
        <p className="mt-8">Thank you for trusting us. <Link className="text-red-700" to={"/"}>Continue Shopping</Link></p>
      </div>
    </div>
  );
};
export default SuccessCheckout;
