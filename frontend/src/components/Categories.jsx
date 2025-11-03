import { useEffect } from "react";
import { useProductStore } from "../stores/useProductStore";
import { Link } from "react-router-dom";

const Categories = () => {
  const { getCategories, categories } = useProductStore();

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="mt-8 px-6">
      <p className="text-4xl font-semibold mb-6">Categories</p>

      {/* Category grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {categories.map((category) => (
          <Link
            key={category.category}
            className="relative group cursor-pointer rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
            to={`/category/${category.category}`}
          >
            {/* Category image */}
            <img
              src={category.image}
              alt={category.category}
              className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
            />

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black opacity-50   group-hover:bg-opacity-50 transition-all duration-300" />

            {/* Category name */}
            <p className="absolute bottom-3 left-3 text-white text-lg font-semibold capitalize tracking-wide">
              {category.category}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;
