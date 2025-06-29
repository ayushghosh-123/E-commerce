import React, { useState } from "react";
import { HiMagnifyingGlass, HiMiniXMark } from "react-icons/hi2";

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSearchToggle = () => {
    setIsOpen(!isOpen);
    // Clear search term when closing the search bar
    if (isOpen) {
      setSearchTerm("");
    }
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchTerm);
    setIsOpen(false); 
    setSearchTerm(""); 
  };

  return (
    <div
      className={`
        flex items-center justify-center transition-all duration-300 ease-in-out
        ${isOpen
          ? "absolute top-10 left-0 w-full bg-white h-24 z-50 border-b border-gray-200 shadow-md"
          : "w-auto"
        }
      `}
    >
      {isOpen ? (
        <form
          onSubmit={handleSubmit}
          className="relative flex items-center w-full max-w-2xl px-4 sm:px-6 lg:px-8"
        >
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleChange}
              className="
                bg-gray-100 dark:bg-gray-200
                px-4 py-3 pl-4 pr-12
                rounded-full
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                w-full
                text-gray-300 dark:text-gray-100
                placeholder:text-gray-500 dark:placeholder:text-gray-400
              "
              aria-label="Search input"
            />
            {/* Search button inside input */}
            <button
              type="submit"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600 focus:outline-none focus:text-blue-600"
              aria-label="Submit search"
            >
              <HiMagnifyingGlass className="h-5 w-5" />
            </button>
          </div>
          {/* Close button */}
          <button
            type="button"
            onClick={handleSearchToggle}
            className="ml-4 text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700 p-2 rounded-full hover:bg-gray-100"
            aria-label="Close search bar"
          >
            <HiMiniXMark className="h-6 w-6" />
          </button>
        </form>
      ) : (
        <button
          onClick={handleSearchToggle}
          className="p-2 rounded-full hover:bg-gray-100 text-gray-600 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Open search bar"
        >
          <HiMagnifyingGlass className="h-6 w-6" />
        </button>
      )}
    </div>
  );
}

export default SearchBar;