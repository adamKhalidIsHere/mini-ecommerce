import { useParams } from "react-router-dom";
import { useProductStore } from "../stores/useProductStore";
import { useEffect } from "react";
import Product from "../components/Product";

const CategoryPage = () => {
  const { getProductsByCategory, categoryProducts } = useProductStore();
  const { category } = useParams();

  useEffect(() => {
    getProductsByCategory(category);
  }, [getProductsByCategory]);

  return (
    <div className="px-30 py-10 gap-4 flex ">
      {categoryProducts.map((product) => (
        <Product product={product} key={product._id} />
      ))}
    </div>
  );
};
export default CategoryPage;
