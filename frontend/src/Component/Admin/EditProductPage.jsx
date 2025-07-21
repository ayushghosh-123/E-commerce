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
    if (file) {
      // Create a URL for the uploaded file to preview it
      const imageUrl = URL.createObjectURL(file);
      
      // Add the new image to the existing images array
      setProductsData(prevData => ({
        ...prevData,
        images: [...prevData.images, { url: imageUrl }]
      }));
      
      console.log(file);
      // TODO: handle actual file upload to server
    }
  };

  const removeImage = (indexToRemove) => {
    setProductsData(prevData => ({
      ...prevData,
      images: prevData.images.filter((_, index) => index !== indexToRemove)
    }));
  };

  const handleSubmit = (e)=>{
    e.preventDefault()
    console.log(productsData);
    
  }

  return (
    <div className="max-w-5xl mx-auto p-6 shadow-md rounded-md">
      <h2 className="text-3xl font-bold mb-6">Edit Product</h2>
      <form onSubmit={handleSubmit}>
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
          <input 
            type="file" 
            accept="image/*"
            onChange={handleImageUpload}
            className="mb-4"
          />
          <div className="flex gap-4 mt-4 flex-wrap">
            {productsData.images.map((image, index) => (
              <div key={index} className="relative">
                <img 
                  src={image.url} 
                  alt={image.altText || "Product Image"} 
                  className="w-20 h-20 object-cover rounded-md shadow-md"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
        <button type='submit' className='w-full bg-green-500  text-white py-2 rounded-md hover:bg-green-600 transition-color'> Update Products</button>
      </form>
    </div>
  );
};

export default EditProductPage;
