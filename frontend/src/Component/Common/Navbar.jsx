import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  HiOutlineUser,
  HiOutlineShoppingBag,
  HiBars3BottomRight,
} from "react-icons/hi2";
import SearchBar from "./SearchBar.jsx"; // Assuming this path is correct
import CartDrawer from "../Layout/CartDrawer.jsx";
import { IoMdClose } from "react-icons/io";

function Navbar() {
  const [drawerOpner, setDrawerOpner] = useState(false);
  const [navDrawerOpen, setnavDrawerOpen] = useState(false);

  const toggleNavDrawer = () => {
    setnavDrawerOpen(!navDrawerOpen);
  };

  const toggleCartDrawer = () => {
    setDrawerOpner(!drawerOpner);
  };

  return (
    <>
      <nav className="static top-10 left-0 w-full bg-white shadow-sm  mt-9 ">
        <div className="container mx-auto flex items-center justify-between py-4 px-4 sm:px-6 lg:px-8">
          {/* Left - Logo */}
          <div>
            <Link
              to="/"
              className="
              text-2xl sm:text-3xl font-bold text-gray-900 
              hover:text-gray-700 transition-colors duration-200
            "
            >
              Rabbit
            </Link>
          </div>

          {/* Center - Navigation Links (Hidden on small screens) */}
          <div className="hidden md:flex space-x-6 lg:space-x-8">
            <Link
              to="#"
              className="
              text-gray-600 hover:text-gray-900 
              text-sm font-medium uppercase 
              transition-colors duration-200
              focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-sm
            "
            >
              Men
            </Link>
            <Link
              to="#"
              className="
              text-gray-600 hover:text-gray-900 
              text-sm font-medium uppercase 
              transition-colors duration-200
              focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-sm
            "
            >
              Women
            </Link>
            <Link
              to="#"
              className="
              text-gray-600 hover:text-gray-900 
              text-sm font-medium uppercase 
              transition-colors duration-200
              focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-sm
            "
            >
              Top Wear
            </Link>
            <Link
              to="#"
              className="
              text-gray-600 hover:text-gray-900 
              text-sm font-medium uppercase 
              transition-colors duration-200
              focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-sm
            "
            >
              Bottom Wear
            </Link>
          </div>

          {/* Right - User, Cart, Search Icons & Mobile Menu Toggle */}
          <div className="flex items-center space-x-4 lg:space-x-6">
            {/* User Icon */}
            <Link
              to="/profile"
              className="
              text-gray-600 hover:text-gray-900 
              transition-colors duration-200 
              p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500
            "
              aria-label="User profile"
            >
              <HiOutlineUser className="h-6 w-6" />
            </Link>

            {/* Shopping Bag Icon with Badge */}
            <button
              onClick={toggleCartDrawer}
              className="
              relative text-gray-600 hover:text-gray-900 
              transition-colors duration-200 
              p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500
            "
              aria-label="Shopping bag"
            >
              <HiOutlineShoppingBag className="h-6 w-6" />
              <span
                className="
                absolute -top-2 -right-2 
                bg-red-600 text-white 
                text-xs font-bold 
                rounded-full 
                h-5 w-5 flex items-center justify-center
              "
                aria-live="polite" // Announce changes to screen readers
                aria-atomic="true" // Announce the entire text content
              >
                4
              </span>
            </button>

            {/* Search Bar Component */}
            {/* IMPORTANT: Removed the 'overflow-hidden' div. The SearchBar component itself
              should handle its fixed positioning when it opens, and a parent 'overflow-hidden'
              would clip it. */}
            <SearchBar />

            {/* Mobile Menu Toggle (Visible only on small screens) */}
            <button
              onClick={toggleNavDrawer}
              className="md:hidden 
              text-gray-600 hover:text-gray-900 
              p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Open mobile navigation menu"
            >
              <HiBars3BottomRight className="h-6 w-6" />
            </button>
          </div>
        </div>
      </nav>
      <CartDrawer
        drawerOpner={drawerOpner}
        toggleCartDrawer={toggleCartDrawer}
      />

      {/* mobile navigation */}
      <div
        className={`fixed top-0 left-0 w-3/4 md:w-1/3 h-full bg-white shadow-lg transform transition-transform duration-300 z-50 ${
          navDrawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4">
          <button onClick={toggleNavDrawer}>
            <IoMdClose className="h-6 w-6 text-gray-600" />
          </button>
        </div>

        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4 ">Menu</h2>
          <nav className="space-y-4">
            <Link to='#' onClick={toggleNavDrawer} className="block text-gray-600 hover:text-black "> Men </Link>
            <Link to='#' onClick={toggleNavDrawer} className="block text-gray-600 hover:text-black "> WoMen </Link>
            <Link to='#' onClick={toggleNavDrawer} className="block text-gray-600 hover:text-black "> Top Wear </Link>
            <Link to='#' onClick={toggleNavDrawer} className="block text-gray-600 hover:text-black "> Bottom Wear </Link>
          </nav>
        </div>
      </div>
    </>
  );
}

export default Navbar;
