import { Link } from "react-router-dom";

const CancelCheckout = () => {
  return (
    <div className="min-h-[calc(100vh-56px)] w-full flex items-center justify-center">
      <div className="bg-zinc-300 px-15 py-10 rounded-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Order cancelled</h1>
        <p>
          If there is any problem contact our support.{" "}
          <Link to={"/"} className="text-red-700u">
            Continue Shopping
          </Link>
        </p>
      </div>
    </div>
  );
};
export default CancelCheckout;
