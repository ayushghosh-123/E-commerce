import React from 'react'
import { TbBrandMeta } from "react-icons/tb"
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa"

function Topbar() {
  return (
    <div className="bg-[#ea2e0e] text-white px-4 py-2 w-full">
      <div className="flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto">
        {/* Social Media Links */}
        <div className="flex space-x-4 mb-2 md:mb-0">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
            <FaFacebookF className="h-5 w-5" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
            <FaTwitter className="h-5 w-5" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
            <FaInstagram className="h-5 w-5" />
          </a>
          <a href="#" className="hover:text-gray-300">
            <TbBrandMeta className="h-5 w-5" />
          </a>
        </div>
        {/* Main Content */}
        <div className="text-center font-semibold flex-1">
          Welc
        </div>

        {/* Phone Number */}
        <div className="mt-2 md:mt-0">
          <span className="font-medium">Call us: </span>
          <a href="tel:+1234567890" className="hover:underline">+1 234 567 890</a>
        </div>
      </div>
    </div>
  )
}

export default Topbar