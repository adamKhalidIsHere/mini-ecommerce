import { useState } from "react";
import { Image, X } from "lucide-react";
import { useProductStore } from "../stores/useProductStore";

const CreateProduct = ({ setCreateModal }) => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    category: "",
    image: "",
  });
  const {createProduct} = useProductStore()


  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setNewProduct({ ...newProduct, image: reader.result });
      };

      reader.readAsDataURL(file); // base64
    }
  };

  const handleSubmit = () => {
    createProduct(newProduct)
  };
  return (
    <div className="">
      <div
        className="w-screen h-full bg-zinc-800 absolute top-0 left-0 opacity-50"
        onClick={() => setCreateModal(false)}
      ></div>
      <form
        onSubmit={handleSubmit}
        className="bg-zinc-300  absolute top-[50%] left-[50%] translate-[-50%]  w-100 rounded-md px-8 py-10"
      >
        <X
          className="absolute right-0 top-0 mr-6 mt-6 cursor-pointer"
          onClick={() => setCreateModal(false)}
        />
        <p className="text-center font-semibold mb-4 text-xl">Create Product</p>
        <input
          type="text"
          className="border-2 rounded-md px-3 py-1 focus:outline-0 mb-3 placeholder-black w-full"
          placeholder="Name"
          onChange={(e) =>
            setNewProduct({ ...newProduct, name: e.target.value })
          }
          value={newProduct.name}
        />
        <input
          type="text"
          className="border-2 rounded-md px-3 py-1 focus:outline-0 mb-3 placeholder-black w-full"
          placeholder="Price"
          onChange={(e) =>
            setNewProduct({ ...newProduct, price: e.target.value })
          }
          value={newProduct.price}
        />
        <input
          type="text"
          className="border-2 rounded-md px-3 py-1 focus:outline-0 mb-3 placeholder-black w-full"
          placeholder="Category"
          onChange={(e) =>
            setNewProduct({ ...newProduct, category: e.target.value })
          }
          value={newProduct.category}
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
        {newProduct.image && (
          <div className="flex w-full justify-center mt-4">
            <img
              src={newProduct.image}
              alt=""
              className=" w-30 h-30 object-cover"
            />

            <X
              onClick={() => {
                setNewProduct({ ...newProduct, image: "" });
              }}
              className="right-0 cursor-pointer"
            />
          </div>
        )}
        <button
          className="font-semibold w-full bg-red-700 text-white  py-2 rounded-md cursor-pointer mt-4"
          type="submit"
        >
          Create Product
        </button>
      </form>
    </div>
  );
};
export default CreateProduct;
