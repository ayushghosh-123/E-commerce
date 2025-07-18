import express from "express";
import asyncHandler from "express-async-handler";
import CartItemSchema from "../models/Cart.model.js";
import Product from "../models/product.model.js";
import { protect } from "../Middleware/authMiddleware.js";

const router = express.Router();

// Helper: Calculate total price
const calculateTotalPrice = (items) =>
  items.reduce(
    (acc, item) => acc + (item.product?.price || item.price || 0) * item.quantity,
    0
  );

// Helper: Get cart for user or guest
const getCart = async (userId, guestId = null) => {
  if (userId) {
    return await CartItemSchema.findOne({ user: userId }).populate(
      "items.product",
      "name price imageUrl"
    );
  } else if (guestId) {
    return await CartItemSchema.findOne({ guestId }).populate(
      "items.product",
      "name price imageUrl"
    );
  }
  return null;
};

// @route POST /api/cart
// @desc Add product to cart
// @access Public (uses 'protect' for logged-in users)
router.post(
  "/",
  protect,
  asyncHandler(async (req, res) => {
    const { productId, quantity, size, color } = req.body;

    if (!productId || quantity == null) {
      return res.status(400).json({ message: "Product ID and quantity are required" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (req.user) {
      // Logged-in user
      let cart = await CartItemSchema.findOne({ user: req.user._id });

      if (!cart) {
        cart = new CartItemSchema({
          user: req.user._id,
          items: [],
          totalPrice: 0,
        });
      }

      const existingItem = cart.items.find(
        (item) =>
          item.product.toString() === productId.toString() &&
          item.size === size &&
          item.color === color
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.items.push({
          product: productId,
          quantity,
          size: size || null,
          color: color || null,
        });
      }

      await cart.populate("items.product", "price");
      cart.totalPrice = calculateTotalPrice(cart.items);

      await cart.save();

      const updatedCart = await getCart(req.user._id);
      res.status(201).json(updatedCart);
    } else {
      // Guest user
      if (!req.session) {
        return res.status(500).json({ message: "Session not initialized for guest user." });
      }

      if (!req.session.cart) req.session.cart = [];

      const guestCart = req.session.cart;
      const existingItem = guestCart.find(
        (item) =>
          item.productId.toString() === productId.toString() &&
          item.size === size &&
          item.color === color
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        guestCart.push({
          productId: productId.toString(),
          quantity,
          price: product.price,
          size: size || null,
          color: color || null,
        });
      }

      req.session.cart = guestCart;
      const totalPrice = calculateTotalPrice(guestCart);

      res.status(201).json({ items: guestCart, totalPrice });
    }
  })
);

// @route PUT /api/cart
// @desc Update product quantity, size, or color
// @access Private
router.put(
  "/",
  protect,
  asyncHandler(async (req, res) => {
    const { productId, quantity, size, color } = req.body;

    if (!productId || quantity == null) {
      return res.status(400).json({ message: "Product ID and quantity are required" });
    }

    if (req.user) {
      // Logged-in user
      let cart = await CartItemSchema.findOne({ user: req.user._id });

      if (!cart) {
        return res.status(404).json({ message: "Cart not found for user." });
      }

      const productIndex = cart.items.findIndex(
        (item) =>
          item.product.toString() === productId.toString() &&
          item.size === size &&
          item.color === color
      );

      if (productIndex === -1) {
        return res.status(404).json({ message: "Product not in cart." });
      }

      if (quantity > 0) {
        cart.items[productIndex].quantity = quantity;
      } else {
        cart.items.splice(productIndex, 1);
      }

      await cart.populate("items.product", "price");
      cart.totalPrice = calculateTotalPrice(cart.items);

      await cart.save();

      const updatedCart = await getCart(req.user._id);
      res.status(200).json(updatedCart);
    } else {
      // Guest user
      if (!req.session || !req.session.cart) {
        return res.status(404).json({ message: "Guest cart not found or session expired." });
      }

      const guestCart = req.session.cart;
      const productIndex = guestCart.findIndex(
        (item) =>
          item.productId.toString() === productId.toString() &&
          item.size === size &&
          item.color === color
      );

      if (productIndex === -1) {
        return res.status(404).json({ message: "Product not in guest cart." });
      }

      if (quantity > 0) {
        guestCart[productIndex].quantity = quantity;
      } else {
        guestCart.splice(productIndex, 1);
      }

      req.session.cart = guestCart;
      const totalPrice = calculateTotalPrice(guestCart);

      res.status(200).json({ items: guestCart, totalPrice });
    }
  })
);

// @route DELETE /api/cart
// @desc Remove product from cart
// @access Private
router.delete(
  "/",
  protect,
  asyncHandler(async (req, res) => {
    const { productId, size, color } = req.body;

    if (!productId) {
      return res.status(400).json({ message: "Product ID is required to remove an item." });
    }

    if (req.user) {
      // Logged-in user
      let cart = await CartItemSchema.findOne({ user: req.user._id });

      if (!cart) {
        return res.status(404).json({ message: "Cart not found for user." });
      }

      const productIndex = cart.items.findIndex(
        (item) =>
          item.product.toString() === productId.toString() &&
          item.size === size &&
          item.color === color
      );

      if (productIndex === -1) {
        return res.status(404).json({ message: "Product not found in cart with specified size/color." });
      }

      cart.items.splice(productIndex, 1);

      await cart.populate("items.product", "price");
      cart.totalPrice = calculateTotalPrice(cart.items);

      await cart.save();

      const updatedCart = await getCart(req.user._id);
      res.status(200).json(updatedCart);
    } else {
      // Guest user
      if (!req.session || !req.session.cart) {
        return res.status(404).json({ message: "Guest cart not found or session expired." });
      }

      const guestCart = req.session.cart;
      const productIndex = guestCart.findIndex(
        (item) =>
          item.productId.toString() === productId.toString() &&
          item.size === size &&
          item.color === color
      );

      if (productIndex === -1) {
        return res.status(404).json({ message: "Product not found in guest cart with specified size/color." });
      }

      guestCart.splice(productIndex, 1);
      req.session.cart = guestCart;

      const totalPrice = calculateTotalPrice(guestCart);

      res.status(200).json({ items: guestCart, totalPrice });
    }
  })
);

// @route GET /api/cart
// @desc Get logged-in or guest cart
// @access Public
router.get(
  "/",
  protect,
  asyncHandler(async (req, res) => {
    try {
      const cart = await getCart(req.user?._id);
      if (cart) {
        res.json(cart);
      } else if (req.session && req.session.cart) {
        const totalPrice = calculateTotalPrice(req.session.cart);
        res.json({ items: req.session.cart, totalPrice });
      } else {
        res.status(404).json({ message: "Cart not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  })
);

// TODO: Merge route fix (if required)
// @route POST /api/cart/merge
// @desc Merge guest cart into user cart on login
// @access Private
router.post(
  "/merge",
  protect,
  asyncHandler(async (req, res) => {
    const guestCartItems = req.session.cart || [];

    if (!Array.isArray(guestCartItems) || guestCartItems.length === 0) {
      return res.status(400).json({ message: "Guest cart is empty or invalid" });
    }

    try {
      let userCart = await CartItemSchema.findOne({ user: req.user._id });

      if (!userCart) {
        userCart = new CartItemSchema({
          user: req.user._id,
          items: [],
          totalPrice: 0,
        });
      }

      guestCartItems.forEach((guestItem) => {
        const existingItemIndex = userCart.items.findIndex(
          (item) =>
            item.product.toString() === guestItem.productId.toString() &&
            item.size === guestItem.size &&
            item.color === guestItem.color
        );

        if (existingItemIndex > -1) {
          userCart.items[existingItemIndex].quantity += guestItem.quantity;
        } else {
          userCart.items.push({
            product: guestItem.productId,
            quantity: guestItem.quantity,
            size: guestItem.size || null,
            color: guestItem.color || null,
          });
        }
      });

      await userCart.populate("items.product", "price");
      userCart.totalPrice = calculateTotalPrice(userCart.items);

      await userCart.save();

      // Clear session guest cart
      req.session.cart = [];

      const updatedCart = await getCart(req.user._id);
      res.status(200).json(updatedCart);
    } catch (error) {
      console.error("Error merging guest cart:", error);
      res.status(500).json({ message: "Failed to merge guest cart" });
    }
  })
);


export default router;
