import React from 'react';
import { HiOutlineCreditCard, HiShoppingBag } from 'react-icons/hi'; // Correct import from 
import { HiArrowPath } from 'react-icons/hi2';

function FeatureSection() {
  return (
    <section className='py-16 px-4 bg-white'>
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">

        {/* Feature - 1 */}
        <div className="flex flex-col items-center">
          <div className="p-4 rounded-full mb-4 bg-gray-100">
            <HiShoppingBag className="text-4xl text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Easy Shopping</h3>
          <p className="text-gray-600">Shop your favorite items with ease and comfort.</p>
        </div>

        {/* fetaure - 2 */}
        <div className="flex flex-col items-center">
          <div className="p-4 rounded-full mb-4 bg-gray-100">
            <HiArrowPath className="text-4xl text-blue-600" />
          </div>
          <h4 className="text-xl font-semibold mb-2">45 Days Return</h4>
          <p className="text-gray-600">Money Back Garenty</p>
        </div>

        <div className="flex flex-col items-center">
          <div className="p-4 rounded-full mb-4 bg-gray-100">
            <HiOutlineCreditCard className="text-4xl text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2">SECURE CHECKOUT</h3>
          <p className="text-gray-600">100% secured checkout process.</p>
        </div>

      </div>
    </section>
  );
}

export default FeatureSection;
