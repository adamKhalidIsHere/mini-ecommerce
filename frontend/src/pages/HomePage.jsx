import LoadingSpinner from "../components/LoadingSpinner";
import ProductsSection from "../components/ProductsSection";
import { useProductStore } from "../stores/useProductStore";

const HomePage = () => {
  const { isLoading } = useProductStore();

  if (isLoading) return <LoadingSpinner />;
  return (
    <>
      <div className="w-full flex justify-between px-30 py-40 items-center min-h-[calc(100vh-56px)]">
        <div className="">
          <p className="text-5xl font-bold w-80 mb-16">
            Buy everything you want now
          </p>
          <a
            href="#shop"
            className="bg-red-700 text-white rounded-full px-10 py-4 font-semibold text-2xl"
          >
            Shop now
          </a>
        </div>
        <div className="max-sm:hidden w-120">
          <img src="/home.png" alt="" />
        </div>
      </div>
      <div className="min-h-screen bg-white px-30 py-20" id="shop">
        <ProductsSection />
      </div>
    </>
  );
};
export default HomePage;
