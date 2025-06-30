import React from 'react'
import Hero from '../Component/Layout/Hero'
import GenderCollectionSection from '../Component/Products/GenderCollectionSection'
import NewArrivals from '../Component/Products/NewArrivals'
import ProductDetails from '../Component/Products/productDetails'

function Home() {
  return (
    <div>
        <Hero/>
        <GenderCollectionSection/>
        <NewArrivals/>

        {/* best seller */}
        <h2 className='text-3xl text-center font-bold mb-4'>
          Best Seller
          <ProductDetails/>
        </h2>
    </div>
  )
}

export default Home