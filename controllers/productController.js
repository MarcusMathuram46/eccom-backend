const express = require("express");
const Product = require("../models/productModel");
const router = express.Router();

// get all products
router.get('/products', async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  try {
    const products = await Product.find()
      .skip((page - 1) * limit)
      .limit(Number(limit));
    const totalProducts = await Product.countDocuments();
    res.json({
      products, // The actual products array
      totalPages: Math.ceil(totalProducts / limit),
      currentPage: Number(page),
      totalProducts  // Total number of products for frontend to adjust pagination
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error });
  }
});


// Get products by category
// Get products by category with pagination
router.get('/products/category/:category', async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  try {
    const category = req.params.category;

    // Find products by category and apply pagination
    const products = await Product.find({ category })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    // Count the total number of products in this category
    const totalProducts = await Product.countDocuments({ category });

    res.json({
      products, // The actual products array
      totalPages: Math.ceil(totalProducts / limit), // Total pages based on category
      currentPage: Number(page),
      totalProducts  // Total number of products in this category
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products by category', error });
  }
});


router.get('/products/search', async (req, res) => {
  const searchTerm = req.query.name || '';
  try {
    const products = await Product.find({ 
      title: { $regex: searchTerm, $options: 'i' }  // 'i' for case-insensitive search
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error searching products', error });
  }
});


router.post("/products", async (req, res) => {
  const { title, category, price, description, quantity, imageUrl } = req.body;
  try {
    const newProduct = new Product({
      title,
      category,
      price,
      description,
      quantity,
      imageUrl
    });
    
    await newProduct.save();
    res.status(201).json({ message: "Product added successfully", newProduct });
  } catch (error) {
    res.status(400).json({ message: "Error adding product", error });
  }
});

module.exports = router;
