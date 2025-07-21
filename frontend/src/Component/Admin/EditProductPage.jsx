import React, { useState } from 'react';

const EditProductPage = () => {
  const [productsData, setProductsData] = useState({
    name: '',
    description: '',
    price: 0,
    countInstock: 0,
    sku: '',
    category: '',
    brand: '',
    size: [],
    colors: [],
    collection: '',
    material: '',
    gender: '',
    images: [
      {
        url: 'https://picsum.photos/150?random=1'
      },
      {
        url: 'https://picsum.photos/150?random=2'
      }
    ]
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductsData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    console.log(file);
    // TODO: handle file upload logic
  };

  return (
    <div className="max-w-5xl mx-auto p-6 shadow-md rounded-md">
      <h2 className="text-3xl font-bold mb-6">Edit Product</h2>
      <form>
        {/* Name */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Product Name</label>
          <input
            type="text"
            name="name"
            value={productsData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>

        {/* Description */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Description</label>
          <textarea
            name="description"
            value={productsData.description}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
            rows={4}
            required
          ></textarea>
        </div>

        {/* Price */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Price</label>
          <input
            type="number"
            name="price"
            value={productsData.price}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>

        {/* Count In Stock */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Count in stock</label>
          <input
            type="number"
            name="countInstock"
            value={productsData.countInstock}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>

        {/* SKU */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">SKU</label>
          <input
            type="text"
            name="sku"
            value={productsData.sku}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>

        {/* Sizes */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Sizes (comma-separated)</label>
          <input
            type="text"
            name="size"
            value={productsData.size.join(',')}
            onChange={(e) => {
              setProductsData({
                ...productsData,
                size: e.target.value.split(',').map((s) => s.trim())
              });
            }}
            className="w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>

        {/* Colors */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Colors (comma-separated)</label>
          <input
            type="text"
            name="colors"
            value={productsData.colors.join(',')}
            onChange={(e) => {
              setProductsData({
                ...productsData,
                colors: e.target.value.split(',').map((c) => c.trim())
              });
            }}
            className="w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>

        {/* Image upload */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Upload Image</label>
          <input type="file" onChange={handleImageUpload} />
        </div>
      </form>
    </div>
  );
};

export default EditProductPage;
