import React from "react";
import mensCollection from "../../assets/mens-collection.webp";
import womenCollection from "../../assets/womens-collection.webp";
import { Link } from "react-router-dom";

function GenderCollectionSection() {
  return (
    <section className="py-16 px-4 lg:px-0">
      <div className="container mx-auto flex flex-col md:flex-row gap-9">

        {/* women section */}
        <div className="relative flex-1">
          <img
            src={womenCollection}
            alt="Women's Collection"
            className="w-full h-[700px] object-cover"
          />
          <div className="absolute bottom-8 left-8 bg-white bg-opacity-90 ">
            <h2 className="text-2xl font-bold text-gray-900 mb-3 ">
              Women Collection
            </h2>
            <Link to="/collections/women" className="text-gray-900 underline">Shop now</Link>
          </div>
        </div>

        {/* Men Section */}
           <div className="relative flex-1">
          <img
            src={mensCollection}
            alt="Women's Collection"
            className="w-full h-[700px] object-cover"
          />
          <div className="absolute bottom-8 left-8 bg-white bg-opacity-90 ">
            <h2 className="text-2xl font-bold text-gray-900 mb-3 ">
                Men Collection
            </h2>
            <Link to="/collections/men" className="text-gray-900 underline">Shop now</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default GenderCollectionSection;
