import React, { useState } from 'react'

const EditProductPage = () => {

    const [productsData, setproductsData] = useState({
        name:"",
        description:"",
        price: 0,
        countInstock: 0,
        sku: "",
        category: "",
        brand: "",
        size:[],
        colors: [],
        collection: "",
        material: "",
        gender:"",
        images:[{
            url: "https://picsum.photos.150?random=1"
        },
        {
            url: "https://picsum.photos.150?random=1"
        }
        ]
    })

    const handleChange = (e) =>{
        const {name, value} = e.target;
        setproductsData((preData) =>({
          ...preData,
          [Data]: value
        }))
    }
  return (
    <div className='max-w-5xl mx-auto p-6 shadow-md rounded-md'>
      <h2 className='text-3xl font-bold mb-6'>Edit Product</h2>
      <form >
        {/* Name  */}
        <div className="mb-6">
          <label className='block font-semibold mb-2'>Product Name</label>
          <input type="text" name='name' value={productsData.name} onChange={handleChange} className='w-full border border-gray-300 rounded-md p-2' required/>
        </div>

        {/* Description */}
         <div className="mb-6">
          <label className='block font-semibold mb-2'>Product Name</label>
          <textarea name="description" value={productsData.description} className='w-full border border-gray-300 rounded-md p-2' rows={4} required></textarea>
        </div>

        {/* Price */}
        <div className="mb-6">
          <label className='block font-semibold mb-2'>Price</label>
         <input type="text" name='name' value={productsData.price} onChange={handleChange} className='w-full border border-gray-300 rounded-md p-2' required/>
        </div>

        {/* Count In stack */}
         <div className="mb-6">
          <label className='block font-semibold mb-2'>Count in stock</label>
         <input type="number" name='countInstock' value={productsData.countInstock} onChange={handleChange} className='w-full border border-gray-300 rounded-md p-2' required/>
        </div>

        {/* sku */}
        <div className="mb-6">
          <label className='block font-semibold mb-2'>SKU</label>
         <input type="text" name='sku' value={productsData.sku} onChange={handleChange} className='w-full border border-gray-300 rounded-md p-2' required/>
        </div>

      {/* sizes */}
        <div className="mb-6">
          <label className='block font-semibold mb-2'>Sizes (coma-separated)</label>
         <input type="text" name='sizes' value={productsData.size.join(",")} onChange={handleChange} onChangeCapture={(e)=>{
          setproductsData({
            ...productsData,
            sizes: e.target.value.split(',').map((size)=>size.trim())
          })
         }} className='w-full border border-gray-300 rounded-md p-2' required/>
        </div>

        {/* colors */}
        <div className="mb-6">
          <label className='block font-semibold mb-2'>Colors (coma-separated)</label>
         <input type="text" name='colors' value={productsData.size.join(",")} onChange={handleChange} onChangeCapture={(e)=>{
          setproductsData({
            ...productsData,
            sizes: e.target.value.split(',').map((size)=>size.trim())
          })
         }} className='w-full border border-gray-300 rounded-md p-2' required/>
        </div>
      </form>
    </div>
  )
}

export default EditProductPage