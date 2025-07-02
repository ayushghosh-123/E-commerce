import React from 'react'
import Hero from '../Component/Layout/Hero'
import GenderCollectionSection from '../Component/Products/GenderCollectionSection'
import NewArrivals from '../Component/Products/NewArrivals'
import ProductDetails from '../Component/Products/productDetails'
import ProductGrid from '../Component/Products/ProductGrid'
import Featurecollection from '../Component/Products/Featurecollection'
import FeatureSection from '../Component/Products/FeatureSection'

const placeholderProducts = [
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
  }
]

function Home() {
  return (
    <div>
        <Hero/>
        <GenderCollectionSection/>
        <NewArrivals/>

        {/* best seller */}
        <h2 className='text-3xl text-center font-bold mb-3 mt-3'> Best Seller </h2>
          <ProductDetails/>

        <div className="container mx-auto">
            <h2 className="text-3xl text-center font-bold mb-4">Top Wears for Women</h2>
            <ProductGrid products={placeholderProducts}/>
        </div>

        <Featurecollection/>
        <FeatureSection/>
    </div>
  )
}

export default Home