import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Product from "./Product";

const ProductRow = ({ sectionName, products }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const { scrollLeft, clientWidth } = scrollRef.current;
    const scrollTo =
      direction === "left"
        ? scrollLeft - clientWidth
        : scrollLeft + clientWidth;
    scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <p className="text-4xl font-semibold mb-4">{sectionName}</p>

      {/* Left and right scroll buttons */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-10 hover:bg-gray-100"
      >
        <ChevronLeft />
      </button>

      <button
        onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-10 hover:bg-gray-100"
      >
        <ChevronRight />
      </button>

      {/* Scrollable row */}
      <div
        ref={scrollRef}
        className="overflow-x-auto scroll-smooth scrollbar-hide"
      >
        <div className="flex gap-4 px-8 py-2">
          {products.map((product) => (
            <Product product={product} key={product._id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductRow;
