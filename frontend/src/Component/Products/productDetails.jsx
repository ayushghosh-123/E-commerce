import React from "react";

function ProductDetails() {
  const products = [
    {
      id: "1",
      name: "Classic Denim Jacket",
      brand: "UrbanWear",
      price: 79.99,
      originalPrice: 99.99,
      description:
        "A timeless denim jacket with a modern fit, perfect for all seasons.",
      material: "100% Cotton Denim",
      sizes: ["S", "M", "L", "XL"],
      color: "Blue",
      images: [
        {
          url: "https://picsum.photos/id/1011/400/400?random=1",
          altText: "Stylish jacket 1",
        },
        {
          url: "https://picsum.photos/id/1011/400/400?random=2",
          altText: "Stylish jacket 2",
        },
      ],
    },
  ];

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg">
        <div className="flex flex-col md:flex-row">
          {/* left thumbnail */}
          <div className="hidden md:flex flex-col space-y-4 mr-6">
            {products[0]?.images.map((image, index) => (
              <img
                key={index}
                src={image.url}
                alt={image.altText || `Thumbnail ${index}`}
                className="w-20 h-20 object-cover rounded-lg cursor-pointer border"
              />
            ))}
          </div>

          {/* main Image */}
          <div className="md:w-1/2">
            <div className="mb-4">
              <img
                src={products[0]?.images[0]?.url}
                alt="Main Product"
                className="w-full h-auto object-cover rounded-lg"
              />
            </div>
          </div>

          {/* mobile thumbnail */}
          <div className="md:hidden flex overflow-x-hidden space-x-4 mb-4">
            {products[0]?.images.map((image, index) => (
              <img
                key={index}
                src={image.url}
                alt={image.altText || `Thumbnail ${index}`}
                className="w-20 h-20 object-cover rounded-lg cursor-pointer border"
              />
            ))}
          </div>

          {/* right sections */}
          
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
