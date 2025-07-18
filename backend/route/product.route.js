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


// @route GET /api/products
// @desc Get all products with optional query filter
// @access Public

router.get("/", async (req, res) => {
  try {
    const {
      collection,
      size,
      color,
      gender,
      minPrice,
      maxPrice,
      sortBy,
      search,
      category,
      material,
      brand,
      limit,
    } = req.query;

    let query = {};

    if (collection && collection.toLowerCase() !== 'all') {
      query.collection = collection;
    }

    if (category && category.toLowerCase() !== 'all') {
      query.category = category;
    }

    if (material) {
      query.material = { $in: material.split(",").map(item => item.trim()) };
    }

    if (brand) {
      query.brand = { $in: brand.split(",").map(item => item.trim()) };
    }

    if (size) {
      query.sizes = { $in: size.split(",").map(item => item.trim()) };
    }

    if (color) {
      query.colors = { $in: color.split(",").map(item => item.trim()) };
    }

    if (gender) {
      query.gender = gender;
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = parseFloat(minPrice); // ✅ Fix string → number
      if (maxPrice) query.price.$lte = parseFloat(maxPrice);
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    // sort logic
    let sort = {};
    if (sortBy) {
      switch (sortBy) {
        case "priceAsc":
          sort = { price: 1 };
          break;
        case "priceDesc":
          sort = { price: -1 };
          break;
        case "popularity":
          sort = { rating: -1 };
          break;
        default:
          break;
      }
    }

    // fetch products and apply sorting and limit
    let products = await Product.find(query)
      .sort(sort)
      .limit(Number(limit) || 0);

    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});


// @route GET /api/products/best-seller
// @desc Retrieve the products with highest rating
// @access Public

router.get("/best-seller", async (req, res) => {
  try {
    // Optional: limit results from query param, default to 10
    const limit = parseInt(req.query.limit) || 10;

    // Fetch products sorted by rating descending
    const bestSellers = await Product.find({})
      .sort({ rating: -1 }) // Highest rated first
      .limit(limit);

    res.json(bestSellers);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// @route GET /api/products/new-arrivals
// @desc Retrive leastes 8 products - Creation date
// @acess Public

router.get('/new-arrivals', async (req, res) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 }).limit(8);               
        res.status(200).json(products);
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// @route GET /api/products/:id
// @desc Get a single product by ID
// @access Public

router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.error(error);

    // Handle invalid ObjectId errors (e.g., if ID is malformed)
    if (error.name === "CastError" && error.kind === "ObjectId") {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    res.status(500).send("Server Error");
  }
});

// @route Get/api/products/similar/:id
// @desc Retrieve similar based on the curent product's genderand category
// @acess Public

// @route GET /api/products/similar/:id
// @desc Retrieve similar products based on the current product's gender and category
// @access Public

router.get("/similar/:id", async (req, res) => {
  try {
    // Find the current product by ID
    const currentProduct = await Product.findById(req.params.id);

    if (!currentProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Build query for similar products
    const query = {
      _id: { $ne: currentProduct._id }, // exclude the current product
      gender: currentProduct.gender,
      category: currentProduct.category,
    };

    // Find similar products (limit to 10 for performance)
    const similarProducts = await Product.find(query).limit(10);

    res.json(similarProducts);
  } catch (error) {
    console.error(error);

    // Handle invalid ObjectId
    if (error.name === "CastError" && error.kind === "ObjectId") {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    res.status(500).send("Server Error");
  }
});


export default router;
