import { useEffect } from "react";
import { useProductStore } from "../stores/useProductStore";
import ProductRow from "./ProductRow";
import LoadingSpinner from "./LoadingSpinner";
import Categories from "./Categories";

const ProductsSection = () => {
  const { getFeaturedProducts, featuredProducts, isLoading } =
    useProductStore();

  useEffect(() => {
    getFeaturedProducts();
  }, []);

  if (isLoading) return <LoadingSpinner />;

  return (
    <>
      <ProductRow
        sectionName={"Featured Products"}
        products={featuredProducts}
      />
      <Categories />
    </>
  );
};
export default ProductsSection;
