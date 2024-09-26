const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    title: String,
    category: String,
    imageUrl: String,
    price: Number,
    description: String,
    quantity: Number,
  });
  

module.exports = mongoose.model("Product", ProductSchema);
