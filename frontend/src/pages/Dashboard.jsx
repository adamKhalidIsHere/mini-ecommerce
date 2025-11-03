import { useState } from "react";
import { ProductsDashboard } from "../components/ProductsDashboard";

const Dashboard = () => {
  const [category, setCategory] = useState("products");
  return (
    <div className="w-full min-h-[calc(100vh-56px)] flex flex-col items-center">
      <div className="flex bg-zinc-300 justify-center items-center h-6 px-2 py-6 mt-10 rounded-md">
        <div
          className={`${
            category === "products" ? "bg-red-500" : "hover:bg-white"
          } mr-2 cursor-pointer rounded-md duration-300 px-4 py-1`}
          onClick={() => setCategory("products")}
        >
          Products
        </div>
        <div
          className={`${
            category === "orders" ? "bg-red-500" : 
            "hover:bg-white"
          } cursor-pointer rounded-md duration-300 px-4 py-1`}
          onClick={() => setCategory("orders")}
        >
          Orders
        </div>
      </div>
      {category === "products" && <ProductsDashboard />}
    </div>
  );
};
export default Dashboard;
