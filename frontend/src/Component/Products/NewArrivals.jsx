import React, { useRef } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";

function NewArrivals() {
  const scrollRef = useRef(null); // for scrolling

  const scroll = (scrollOffset) => {
    scrollRef.current.scrollBy({ left: scrollOffset, behavior: "smooth" });
  };

  const newArrivals = [
    {
      _id: "1",
      name: "Stylish jacket",
      price: 120,
      image: [
        {
          url: "https://picsum.photos/500/500?random=1",
          altext: "stylish jacket",
        },
      ],
    },
    {
      _id: "2",
      name: "Stylish jacket",
      price: 120,
      image: [
        {
          url: "https://picsum.photos/500/500?random=2",
          altext: "stylish jacket",
        },
      ],
    },
    {
      _id: "3",
      name: "Stylish jacket",
      price: 120,
      image: [
        {
          url: "https://picsum.photos/500/500?random=3",
          altext: "stylish jacket",
        },
      ],
    },
    {
      _id: "4",
      name: "Stylish jacket",
      price: 120,
      image: [
        {
          url: "https://picsum.photos/500/500?random=4",
          altext: "stylish jacket",
        },
      ],
    },
    {
      _id: "5",
      name: "Stylish jacket",
      price: 120,
      image: [
        {
          url: "https://picsum.photos/500/500?random=5",
          altext: "stylish jacket",
        },
      ],
    },
    {
      _id: "6",
      name: "Stylish jacket",
      price: 120,
      image: [
        {
          url: "https://picsum.photos/500/500?random=6",
          altext: "stylish jacket",
        },
      ],
    },
    {
      _id: "7",
      name: "Stylish jacket",
      price: 120,
      image: [
        {
          url: "https://picsum.photos/500/500?random=7",
          altext: "stylish jacket",
        },
      ],
    },
    {
      _id: "8",
      name: "Stylish jacket",
      price: 120,
      image: [
        {
          url: "https://picsum.photos/500/500?random=8",
          altext: "stylish jacket",
        },
      ],
    },
    {
      _id: "9",
      name: "Stylish jacket",
      price: 120,
      image: [
        {
          url: "https://picsum.photos/500/500?random=9",
          altext: "stylish jacket",
        },
      ],
    },
  ];

  return (
    <section>
      <div className="container mx-auto text-center mb-10 relative">
        <h2 className="text-3xl font-bold mb-4">Explore New Arrivals</h2>
        <p className="text-lg text-gray-700 mb-8">
          Discover the latest styles straight off the runway, freshly added to
          keep your wardrobe on the cutting edge of fashion
        </p>

        {/* Arrows */}
        <div className="absolute right-4 bottom-[-30px] flex space-x-2">
          <button
            onClick={() => scroll(-300)}
            className="p-2 rounded border bg-white text-black shadow"
          >
            <FiChevronLeft className="text-2xl" />
          </button>
          <button
            onClick={() => scroll(300)}
            className="p-2 rounded border bg-white text-black shadow"
          >
            <FiChevronRight className="text-2xl" />
          </button>
        </div>
      </div>
      
      {/* Product Cards Scroll Section */}
      <div
        ref={scrollRef}
        className="overflow-x-hidden px-4 pb-4 scroll-smooth"
      >
        <div className="flex space-x-6 w-max">
          {newArrivals.map((product) => (
            <div
              key={product._id}
              className="min-w-[220px] bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-200 relative"
            >
              <img
                src={product.image[0].url}
                alt={product.image[0].altext}
                className="w-full h-56 object-cover rounded-t-lg"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                <p className="text-gray-700 font-bold">${product.price}</p>
              </div>

              {/* Absolute bottom overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 backdrop-blur-sm text-white p-3 rounded-b-lg">
                <Link to={`/product/${product._id}`} className="block">
                  <h4 className="font-medium">{product.name}</h4>
                  <p className="mt-1">${product.price}</p>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default NewArrivals;
