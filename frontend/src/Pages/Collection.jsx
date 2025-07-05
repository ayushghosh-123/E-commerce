import React, { useEffect, useRef, useState } from "react";
import { FaFilter } from "react-icons/fa";
import Filtersidebar from "../Component/Layout/Filtersidebar";
import Sortoption from "../Component/Products/Sortoption";
import ProductGrid from "../Component/Products/ProductGrid";

function Collection() {
  const [products, setProducts] = useState([]);
  const [isSidebar, setIsSidebar] = useState(false);
  const SidebarRef = useRef(null);

  const toggleSidebar = () => {
    setIsSidebar(!isSidebar);
  };

  const handleClickOutside = (e) => {
    // Check if sidebar is open and screen width is less than 1024px
    if (isSidebar && window.innerWidth < 1024) {
      // If click is outside of sidebar, close it
      if (SidebarRef.current && !SidebarRef.current.contains(e.target)) {
        setIsSidebar(false);
      }
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      const fetchProducts = [
        {
          _id: 1,
          name: "product 1",
          price: 200,
          images: [{ url: "https://picsum.photos/500/500?random=1" }],
        },
        {
          _id: 2,
          name: "product 2",
          price: 300,
          images: [{ url: "https://picsum.photos/500/500?random=2" }],
        },
        {
          _id: 3,
          name: "product 3",
          price: 100,
          images: [{ url: "https://picsum.photos/500/500?random=3" }],
        },
        {
          _id: 5,
          name: "product 4",
          price: 100,
          images: [{ url: "https://picsum.photos/500/500?random=5" }],
        },
        {
          _id: 6,
          name: "product 6",
          price: 600,
          images: [{ url: "https://picsum.photos/500/500?random=6" }],
        },
        {
          _id: 7,
          name: "product 7",
          price: 900,
          images: [{ url: "https://picsum.photos/500/500?random=7" }],
        },
        {
          _id: 8,
          name: "product 8",
          price: 400,
          images: [{ url: "https://picsum.photos/500/500?random=8" }],
        },
        {
          _id: 9,
          name: "product 9",
          price: 200,
          images: [{ url: "https://picsum.photos/500/500?random=9" }],
        },
      ];
      setProducts(fetchProducts);
    }, 1000);
  }, []);

  return (
    <div className="flex flex-col lg:flex-row">
      {/* Mobile filter button */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden p-2 flex justify-center items-center"
      >
        <FaFilter className="mr-2" />
        Filters
      </button>

      {/* Filter sidebar */}
      <div
        ref={SidebarRef}
        className={`
        fixed inset-y-0 left-0 w-64 bg-white overflow-y-auto transition-transform duration-300 z-50
        ${isSidebar ? "translate-x-0 " : "-translate-x-full "}
        lg:static lg:translate-x-0 
    `}
      >
        <Filtersidebar />
      </div>
      <div className="flex-grow p-4">
        <h2 className="text-2xl uppercase mb-4">All Collection</h2>

        {/* sort Options */}
        <Sortoption />

        {/*product grid  */}
        <ProductGrid products={products} />
      </div>
    </div>
  );
}

export default Collection;
