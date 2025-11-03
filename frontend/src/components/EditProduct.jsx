import { X, Image } from "lucide-react";
import { useState } from "react";
import { useProductStore } from "../stores/useProductStore";

const EditProduct = ({ product, setEditModal }) => {
  const [editedProduct, setEditedProduct] = useState(product);
  const { editProduct } = useProductStore();

  const handleSubmit = () => {
    editProduct(product._id, editedProduct);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setEditedProduct({ ...editedProduct, image: reader.result });
      };

      reader.readAsDataURL(file);
    }
  };
  return (
    <div className="">
      <div
        className="w-screen h-full bg-zinc-800 absolute top-0 left-0 opacity-50"
        onClick={() => setEditModal(false)}
      ></div>
      <form
        onSubmit={handleSubmit}
        className="bg-zinc-300  absolute top-[50%] left-[50%] translate-[-50%]  w-100 rounded-md px-8 py-10"
      >
        <X
          className="absolute right-0 top-0 mr-6 mt-6 cursor-pointer"
          onClick={() => setEditModal(false)}
        />
        <p className="text-center font-semibold mb-4 text-xl">Edit Product</p>
        <input
          type="text"
          className="border-2 rounded-md px-3 py-1 focus:outline-0 mb-3 placeholder-black w-full"
          placeholder="Name"
          onChange={(e) =>
            setEditedProduct({ ...editedProduct, name: e.target.value })
          }
          value={editedProduct.name}
        />
        <input
          type="text"
          className="border-2 rounded-md px-3 py-1 focus:outline-0 mb-3 placeholder-black w-full"
          placeholder="Price"
          onChange={(e) =>
            setEditedProduct({ ...editedProduct, price: e.target.value })
          }
          value={editedProduct.price}
        />
        <input
          type="text"
          className="border-2 rounded-md px-3 py-1 focus:outline-0 mb-3 placeholder-black w-full"
          placeholder="Category"
          onChange={(e) =>
            setEditedProduct({ ...editedProduct, category: e.target.value })
          }
          value={editedProduct.category}
        />
        <div className="border-2 rounded-md px-3 py-1 flex">
          <div className=""></div>
          <label className="cursor-pointer" htmlFor="file">
            <Image />
          </label>
          <input
            type="file"
            className="hidden"
            id="file"
            placeholder="Image"
            onChange={(e) => handleFileChange(e)}
          />
        </div>
        {product.image && (
          <div className="flex w-full justify-center mt-4">
            <img
              src={editedProduct.image}
              alt=""
              className=" w-30 h-30 object-cover"
            />

            <X
              onClick={() => {
                setEditedProduct({ ...editedProduct, image: "" });
              }}
              className="right-0 cursor-pointer"
            />
          </div>
        )}
        <button
          className="font-semibold w-full bg-red-700 text-white  py-2 rounded-md cursor-pointer mt-4"
          type="submit"
        >
          Edit Product
        </button>
      </form>
    </div>
  );
};
export default EditProduct;
