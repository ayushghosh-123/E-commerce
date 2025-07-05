import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cartProducts, setCartProducts] = useState([]);

  const addToCart = (product, quantity, size, color) => {
    // Check if product with same options exists
    const idx = cartProducts.findIndex(
      p => p.productId === product.id && p.size === size && p.color === color
    );
    if (idx > -1) {
      // Update quantity
      const updated = [...cartProducts];
      updated[idx].quantity += quantity;
      setCartProducts(updated);
    } else {
      setCartProducts([
        ...cartProducts,
        {
          productId: product.id,
          name: product.name,
          size,
          color,
          quantity,
          price: product.price,
          image: product.images[0]?.url
        }
      ]);
    }
  };

  const updateQuantity = (index, delta) => {
    const updated = [...cartProducts];
    updated[index].quantity += delta;
    if (updated[index].quantity < 1) updated[index].quantity = 1;
    setCartProducts(updated);
  };

  const value = { cartProducts, addToCart, updateQuantity };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}