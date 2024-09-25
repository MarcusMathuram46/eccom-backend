const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    title: String,
    category: String,
    image: String,
    price: Number,
    description: String,
    quantity: Number,
  });
  

module.exports = mongoose.model("Product", ProductSchema);
