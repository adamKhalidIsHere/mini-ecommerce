import { useState } from "react";
import { useCartStore } from "../stores/useCartStore";

const Product = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCartStore();

  return (
    <div className="w-[200px] bg-zinc-300 px-4 py-4 rounded-md flex flex-col justify-between flex-shrink-0 ">
      {" "}
      <img
        src={product.image}
        alt={`${product.name} image`}
        className="object-cover text-center w-50 h-32 rounded-md"
      />
      <p className="text-xs mt-2">{product.name}</p>
      <div className="flex mt-2 items-center">
        <button
          className="border-2 border-r-0 rounded-md rounded-r-none w-4 cursor-pointer"
          onClick={() => setQuantity(quantity === 1 ? 1 : quantity - 1)}
        >
          -
        </button>

        <input
          type="text"
          className="w-8 focus:outline-0 border-2 px-0.5 text-center"
          value={quantity}
          readOnly
        />

        <button
          className="border-2 border-l-0 rounded-md rounded-l-none w-4 cursor-pointer"
          onClick={() => setQuantity(quantity + 1)}
        >
          +
        </button>

        <button
          className="bg-red-700 rounded-md px-2 py-0.5 text-sm cursor-pointer ml-2 text-white"
          onClick={() =>
            addToCart({ productId: product._id, quantity }, product)
          }
        >
          Add to cart
        </button>
      </div>
    </div>
  );
};
export default Product;
