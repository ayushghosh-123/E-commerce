import express from "express";
import Product from "../models/product.model.js";
import { protect, admin } from "../Middleware/authMiddleware.js";
// import { admin } from "../Middleware/authMiddleware.js";

const router = express.Router();

// @route POST /api/products
// @desc Create a new Product
// @access private / Admin

router.post("/",protect,  async (req, res) => {
  try {
    // console.log(req.user);

    if (!req.user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const {
      name,
      description,
      price,
      discountPrice,
      countInStock,
      category,
      brand,
      sizes,
      colors,
      collection,
      material,
      gender,
      images,
      isFeatured,
      isPublished,
      tags,
      dimensions,
      weight,
      sku,
    } = req.body;

    const product = new Product({
      name,
      description,
      price,
      discountPrice,
      countInStock, // <-- corrected field name
      category,
      brand,
      sizes,
      colors,
      collection,
      material,
      gender,
      images,
      isFeatured,
      isPublished,
      tags,
      dimensions,
      weight,
      sku,
      user: req.user._id,
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});


// route PUT /api/products/:id
// @desc  Update an existing product by ID
// @access Private/Admin
router.put("/:id", protect, admin, async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      discountPrice,
      countInStock,
      category,
      brand,
      sizes,
      colors,
      collection,
      material,
      gender,
      images,
      isFeatured,
      isPublished,
      tags,
      dimensions,
      weight,
      sku,
    } = req.body;

    // find product by ID
    const product = await Product.findById(req.params.id);

    if (product) {
      product.name = name || product.name;
      product.description = description || product.description; // fixed typo
      product.price = price || product.price;
      product.discountPrice = discountPrice || product.discountPrice;
      product.countInStock = countInStock || product.countInStock; // fixed field
      product.category = category || product.category;
      product.brand = brand || product.brand;
      product.sizes = sizes || product.sizes;
      product.colors = colors || product.colors;
      product.collection = collection || product.collection;
      product.material = material || product.material;
      product.gender = gender || product.gender;
      product.images = images || product.images;
      product.isFeatured = isFeatured !== undefined ? isFeatured : product.isFeatured;
      product.isPublished = isPublished !== undefined ? isPublished : product.isPublished;
      product.tags = tags || product.tags;
      product.dimensions = dimensions || product.dimensions;
      product.weight = weight || product.weight;
      product.sku = sku || product.sku;

      // save the updated product
      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});


// @route Delete / api/products/:id
// @desc Delete a product by Id
// @acess Private/Admin

router.delete("/:id", protect, admin, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      await product.deleteOne(); // ✅ delete document
      res.json({ message: "Product removed" });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});


// @route GET / API/ PRODUCTS
// @desc Get all products with optional query filter
// @acess Public

router.get("/", async(req, res)=>{
  try {
    const {collection, size, color, gender, minPrice, maxPrice, sortBy, search, category, material, brand, limit} = req.query;
    let query={}
    if(collection && collection.toLocaleLowerCase() !== 'alt'){
      query.collections = collection
    }
  } catch (error) {
    
  }
})


export default router;
