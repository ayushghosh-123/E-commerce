import mongoose from "mongoose";

// Sub-schema for individual cart items
const cartItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product", // ✅ Refers to the Product model
      required: true,
    },
    size: {
      type: String,
    },
    color: {
      type: String,
    },
    quantity: {
      type: Number,
      default: 1,
      min: 1,
    },
  },
  {
    _id: false, // Prevents Mongoose from creating an _id for subdocuments
  }
);

// Main cart schema
const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    guestId: {
      type: String, // Optional for guest users (store sessionId or random token)
    },
    items: [cartItemSchema], // ✅ Renamed products → items
    totalPrice: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt & updatedAt
  }
);

const Cart = mongoose.model("Cart", cartSchema);
export default Cart;
