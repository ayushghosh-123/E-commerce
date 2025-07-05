import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import ProductGrid from "./ProductGrid";
import { useCart } from "../../Context/CardContext";

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
    colors: ["Blue", "Black", "Grey"],
    images: [
      {
        url: "https://picsum.photos/500/500?random=1",
        altText: "Stylish jacket 1",
      },
      {
        url: "https://picsum.photos/500/500?random=2",
        altText: "Stylish jacket 2",
      },
    ],
  },
];

const similarProducts = [
  {
    _id: 1,
    name: "product 1",
    price: 100,
    images: [{ url: "https://picsum.photos/500/500?random=1" }],
  },
  {
    _id: 2,
    name: "product 2",
    price: 100,
    images: [{ url: "https://picsum.photos/500/500?random=2" }],
  },
  {
    _id: 3,
    name: "product 3",
    price: 100,
    images: [{ url: "https://picsum.photos/500/500?random=3" }],
  },
  {
    _id: 4,
    name: "product 4",
    price: 100,
    images: [{ url: "https://picsum.photos/500/500?random=4" }],
  }
];

function ProductDetails() {
  const product = products[0];
  const [mainImage, setMainImage] = useState(product?.images?.[0]?.url || null);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    const { addToCart } = useCart();

  const handleAddToCart = () => {
    if (!selectedColor || !selectedSize) {
      toast.error("Please select a size and color before adding", {
        duration: 1000,
      });
      return;
    }

    setIsButtonDisabled(true);

    // Add to cart context
    addToCart(product, quantity, selectedSize, selectedColor);

    setTimeout(() => {
      toast.success("Product added to cart", {
        duration: 1000,
      });
      setIsButtonDisabled(false);
    }, 1000);
  };


  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg">
        <div className="flex flex-col md:flex-row">
          {/* Thumbnails */}
          <div className="hidden md:flex flex-col space-y-4 mr-6">
            {product.images.map((image, index) => (
              <img
                key={index}
                src={image.url}
                alt={image.altText || `Thumbnail ${index}`}
                className={`w-20 h-20 object-cover rounded-lg cursor-pointer border ${
                  mainImage === image.url ? "border-black" : "border-gray-300"
                }`}
                onClick={() => setMainImage(image.url)}
              />
            ))}
          </div>

          {/* Main Image */}
          <div className="md:w-1/2">
            {mainImage && (
              <img
                src={mainImage}
                alt="Main Product"
                className="w-full h-full object-cover rounded-lg mb-4"
              />
            )}
          </div>

          {/* Mobile thumbnails */}
          <div className="md:hidden flex overflow-x-auto space-x-4 mb-4">
            {product.images.map((image, index) => (
              <img
                key={index}
                src={image.url}
                alt={image.altText || `Thumbnail ${index}`}
                className={`w-20 h-20 object-cover rounded-lg cursor-pointer border ${
                  mainImage === image.url ? "border-black" : "border-gray-300"
                }`}
                onClick={() => setMainImage(image.url)}
              />
            ))}
          </div>

          {/* Product Info */}
          <div className="md:w-1/2 md:ml-10">
            <h1 className="text-2xl md:text-3xl font-semibold mb-2">
              {product.name}
            </h1>
            <p className="text-lg text-gray-700 mb-1 line-through">
              ${product.originalPrice.toFixed(2)}
            </p>
            <p className="text-xl text-gray-900 font-bold mb-2">
              ${product.price.toFixed(2)}
            </p>
            <p className="text-gray-600 mb-4">{product.description}</p>

            {/* Color Selection */}
            <div className="mb-4">
              <p className="text-gray-700 text-lg font-semibold">Color:</p>
              <div className="flex gap-2 mt-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    className={`w-8 h-8 rounded-full border-2 ${
                      selectedColor === color
                        ? "border-black scale-110"
                        : "border-gray-300"
                    }`}
                    style={{ backgroundColor: color.toLowerCase() }}
                    onClick={() => setSelectedColor(color)}
                    title={color}
                  />
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="mb-4">
              <p className="text-gray-700 text-lg font-semibold">Size:</p>
              <div className="flex gap-2 mt-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    className={`px-4 py-2 rounded border text-base ${
                      selectedSize === size
                        ? "bg-black text-white border-black"
                        : "border-gray-300"
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Control */}
            <div className="mb-6">
              <p className="text-gray-700 text-lg font-semibold">Quantity:</p>
              <div className="flex items-center space-x-4 mt-2">
                <button
                  className="px-3 py-1 bg-gray-200 rounded text-lg"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                >
                  -
                </button>
                <span className="text-lg">{quantity}</span>
                <button
                  className="px-3 py-1 bg-gray-200 rounded text-lg"
                  onClick={() => setQuantity((q) => q + 1)}
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <button
              disabled={isButtonDisabled}
              onClick={handleAddToCart}
              className={`py-3 px-6 rounded-2xl w-full text-xl font-semibold transition bg-black text-white ${
                isButtonDisabled
                  ? "cursor-not-allowed opacity-50"
                  : "hover:bg-gray-900"
              }`}
            >
              {isButtonDisabled ? "Adding..." : "ADD TO CART"}
            </button>

            {/* Product Characteristics */}
            <div className="mt-10 text-gray-600">
              <h3 className="text-xl font-bold mb-4">Characteristics:</h3>
              <table className="w-full text-left text-sm text-gray-500">
                <tbody>
                  <tr>
                    <td className="py-1 font-medium">Brand</td>
                    <td className="py-1">{product.brand}</td>
                  </tr>
                  <tr>
                    <td className="py-1 font-medium">Material</td>
                    <td className="py-1">{product.material}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-20">
          <h2 className="text-2xl text-center font-medium mb-4">
            You May Also Like
          </h2>
          <ProductGrid products={similarProducts} />
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
