import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

function Filtersidebar() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    category: "",
    gender: "",
    colors: [], // Changed to an array for multiple color selection
    size: [],
    material: [],
    brand: [],
    minPrice: 0,
    maxPrice: 100,
  });

  const categories = ["Top Wear", "Bottom Wear"];
  const genders = ["Men", "Women", "Unisex"];
  const colors = [
    "Red",
    "Blue",
    "Black",
    "White",
    "Green",
    "Yellow",
    "Purple",
    "Orange",
    "Pink",
    "Brown",
    "Gray",
    "Cyan",
    "Magenta",
    "Violet",
    "Indigo",
    "Lime",
    "Olive",
    "Maroon",
    "Navy",
  ];

  const sizes = ["S", "M", "L", "XL"];
  const materials = ["Cotton", "Polyester", "Wool"];
  const brands = ["Nike", "Adidas", "Puma"];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    const newFilters = { ...filters }; // start with current state

    if (type === "checkbox") {
      newFilters[name] = checked
        ? [...filters[name], value]
        : filters[name].filter((v) => v !== value);
    } else {
      newFilters[name] = value;
    }

    setFilters(newFilters); // update state first
    updateUrlParams(newFilters); // pass updated state
  };

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: Number(value),
    }));
  };

  const applyFilters = () => {
    const params = {};
    Object.keys(filters).forEach((key) => {
      if (Array.isArray(filters[key]) && filters[key].length > 0) {
        params[key] = filters[key].join(",");
      } else if (filters[key] !== "" && filters[key] !== 0) {
        params[key] = filters[key];
      }
    });
    setSearchParams(params);
  };

  const updateUrlParams = (newfilter) => {
    const params = new URLSearchParams();

    Object.keys(newfilter).forEach((key) => {
      if (Array.isArray(newfilter[key]) && newfilter[key].length > 0) {
        params.append(key, newfilter[key].join(","));
      } else if (newfilter[key] !== "" && newfilter[key] !== 0) {
        params.append(key, newfilter[key]);
      }
    });

    setSearchParams(params);
    navigate(`?${params.toString()}`);
  };

  return (
    <div className="p-4 space-y-6">
      <h3 className="text-lg font-bold mb-2">Filters</h3>
      {/* Category */}
      <div>
        <label className="block font-semibold mb-1">Category</label>
        <select
          name="category"
          value={filters.category}
          onChange={handleInputChange}
          className="w-full border rounded px-2 py-1"
        >
          <option value="">All</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
      {/* Gender */}
      <div>
        <label className="block font-semibold mb-1">Gender</label>
        <select
          name="gender"
          value={filters.gender}
          onChange={handleInputChange}
          className="w-full border rounded px-2 py-1"
        >
          <option value="">All</option>
          {genders.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
      </div>
      {/* Colors */}
      <div>
        <label className="block font-semibold mb-2">Colors</label>
        <div className="flex flex-wrap gap-2">
          {colors.map((color) => (
            <label
              key={color}
              className={`w-8 h-8 rounded-full cursor-pointer border-2 flex items-center justify-center
          ${
            filters.colors.includes(color)
              ? "ring-2 ring-blue-500 border-blue-500 scale-110"
              : "border-gray-300 hover:scale-105 hover:border-gray-500 transition-all duration-200"
          }`}
              style={{ backgroundColor: color.toLowerCase() }}
            >
              <input
                type="checkbox"
                name="colors"
                value={color}
                checked={filters.colors.includes(color)}
                onChange={handleInputChange}
                className="hidden"
              />
              {/* Optional checkmark inside circle */}
              {filters.colors.includes(color) && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
            </label>
          ))}
        </div>
      </div>

      {/* Size */}
      <div>
        <label className="block font-semibold mb-1">Size</label>
        <div className="flex flex-wrap gap-2">
          {sizes.map((size) => (
            <label key={size} className="flex items-center gap-1">
              <input
                type="checkbox"
                name="size"
                value={size}
                checked={filters.size.includes(size)}
                onChange={handleInputChange}
                className="accent-blue-500"
              />
              <span>{size}</span>
            </label>
          ))}
        </div>
      </div>
      {/* Material */}
      <div>
        <label className="block font-semibold mb-1">Material</label>
        <div className="flex flex-wrap gap-2">
          {materials.map((mat) => (
            <label key={mat} className="flex items-center gap-1">
              <input
                type="checkbox"
                name="material"
                value={mat}
                checked={filters.material.includes(mat)}
                onChange={handleInputChange}
                className="accent-blue-500"
              />
              <span>{mat}</span>
            </label>
          ))}
        </div>
      </div>
      {/* Brand */}
      <div>
        <label className="block font-semibold mb-1">Brand</label>
        <div className="flex flex-wrap gap-2">
          {brands.map((brand) => (
            <label key={brand} className="flex items-center gap-1">
              <input
                type="checkbox"
                name="brand"
                value={brand}
                checked={filters.brand.includes(brand)}
                onChange={handleInputChange}
                className="accent-blue-500"
              />
              <span>{brand}</span>
            </label>
          ))}
        </div>
      </div>
      {/* Price Range */}
      <div>
        <label className="block font-semibold mb-2 text-gray-700">
          Price Range
        </label>
        <div className="flex justify-between text-sm text-gray-600 mb-1">
          <span>${filters.minPrice}</span>
          <span>${filters.maxPrice}</span>
        </div>

        {/* Single Range Slider */}
        <input
          type="range"
          name="maxPrice" // Changed name to 'maxPrice' to directly control it
          value={filters.maxPrice}
          min={0}
          max={1000}
          step={1}
          onChange={handlePriceChange}
          className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer
               accent-blue-600
               [&::-webkit-slider-thumb]:appearance-none
               [&::-webkit-slider-thumb]:w-4
               [&::-webkit-slider-thumb]:h-4
               [&::-webkit-slider-thumb]:bg-blue-600
               [&::-webkit-slider-thumb]:rounded-full
               [&::-webkit-slider-thumb]:shadow
               [&::-webkit-slider-thumb]:cursor-pointer
               focus:outline-none"
        />
      </div>

      {/* Apply Button */}
      <button
        onClick={applyFilters}
        className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition"
      >
        Apply Filters
      </button>
    </div>
  );
}

export default Filtersidebar;
