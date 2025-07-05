import React from 'react';
import { useCart } from '../../Context/CardContext'; // adjust path as needed

function CartContent() {
  const { cartProducts, updateQuantity } = useCart();

  const totalPrice = cartProducts.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      {cartProducts.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-4">
            {cartProducts.map((product, index) => (
              <div key={index} className="flex items-center gap-4 border-b pb-4">
                <img src={product.image} alt={product.name} className="w-24 h-24 object-cover rounded" />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{product.name}</h3>
                  <p className="text-sm text-gray-600">Size: {product.size}</p>
                  <p className="text-sm text-gray-600">Color: {product.color}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(index, -1)}
                      className="bg-gray-200 px-2 py-1 rounded hover:bg-gray-300"
                    >
                      -
                    </button>
                    <span>{product.quantity}</span>
                    <button
                      onClick={() => updateQuantity(index, 1)}
                      className="bg-gray-200 px-2 py-1 rounded hover:bg-gray-300"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold">${(product.price * product.quantity).toFixed(2)}</p>
                  <p className="text-sm text-gray-500">(${product.price} each)</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 text-right">
            <p className="text-xl font-bold">Total: ${totalPrice.toFixed(2)}</p>
            <button className="mt-4 bg-black text-white px-6 py-2 rounded hover:bg-gray-800">
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default CartContent;