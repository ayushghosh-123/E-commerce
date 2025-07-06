import { useState } from 'react'
import React  from 'react'
import { IoMdClose } from 'react-icons/io';
import Cartcontent from '../Cart/Cartcontent';
import { useNavigate } from 'react-router-dom';



const CartDrawer = ({drawerOpner, toggleCartDrawer}) => {

  const navigate = useNavigate()
  const handlecheckout = () =>{
    toggleCartDrawer()
    navigate("/checkout")
  }
    

  return (
    <div className={`fixed top-0 right-0 w-3/4 sm:w-1/2 md:w-1/4 h-full bg-white shadow-lg transorm transition-transform duration-300 flex flex-col z-50 ${drawerOpner? "translate-x-0": "translate-x-full" }`}>
        <div className='flex justify-end p-4'>
            <button onClick={toggleCartDrawer}>
              <IoMdClose className='h-6 w-6 text-gray-600'/>
            </button>
        </div>

        {/* cart Content with scrollable area */}
        <div className='flex-grow p-4 overflow-y-auto'>
          <h2 className='text-xl font-semibold mb-4'>Your Cart</h2>
            <Cartcontent/>
        </div>

        {/* checkout button fixed at the bottom */}
        <div className='p-4 bg-white sticky bottom-0'>
            <button onClick={handlecheckout} className='w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-500'>CheckOut</button>
            <p className='text-sm tracking-tighter text-gray-500 mt-2 text-center'>
              snipping , texts and discount codes calculated a checkout.
            </p>
        </div>
    </div>
  )
}

export default CartDrawer