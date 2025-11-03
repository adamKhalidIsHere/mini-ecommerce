import { useEffect, useState } from "react";

import CreateProduct from "./CreateProduct";
import { SquarePen, Trash2 } from "lucide-react";
import { useProductStore } from "../stores/useProductStore";
import LoadingSpinner from "./LoadingSpinner";
import EditProduct from "./EditProduct";

export const ProductsDashboard = () => {
  const [createModal, setCreateModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({});

  const {
    getProducts,
    products,
    isLoading,
    deleteProduct,
    toggleFeaturedProduct,
  } = useProductStore();

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  if (isLoading) return <LoadingSpinner />;
  return (
    <div className="bg-zinc-300 rounded-md w-140 mt-6 px-8 py-6">
      <button
        className="bg-red-700 text-white rounded-md cursor-pointer px-4 w-full py-2 font-semibold"
        onClick={() => setCreateModal(true)}
      >
        Create product
      </button>
      {createModal && <CreateProduct setCreateModal={setCreateModal} />}
      <div className="mt-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="flex justify-between bg-zinc-200 px-4 mb-2 py-1 rounded-md overflow-y-auto"
            onClick={() => setSelectedProduct(product._id)}
          >
            {editModal &&
              product._id.toString() === selectedProduct.toString() && (
                <EditProduct product={product} setEditModal={setEditModal} />
              )}
            <p>{product.name.slice(0, 30)}{product.name.length >= 30 && "..."}</p>
            <p>{product.price}$</p>
            <div className="flex items-center">
              <SquarePen
                className="cursor-pointer"
                size={20}
                onClick={() => setEditModal(true)}
              />
              <Trash2
                className="text-red-700 ml-2 cursor-pointer"
                size={20}
                onClick={() => deleteProduct(product._id)}
              />
              <button
                className="bg-red-700 text-white rounded-md px-2 cursor-pointer ml-2"
                onClick={() => toggleFeaturedProduct(product._id)}
              >
                Feature
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
