const mongoose = require("mongoose");

// Function to generate 8-character alphanumeric IDs
const generateId = () => Math.random().toString(36).substr(2, 8).toUpperCase();

const InventorySchema = new mongoose.Schema({
  _id: {
    type: String,
    default: generateId, // Custom ID generator
  },
  category: [String],
  title: { type: String, required: true },
  author: { type: String, required: true },
  datePublished: { type: Date, required: true },
  isbn: { type: String, required: true },
  copyIdentifier: { type: String, required: true },
  coverImage: { type: String }, // URL to the book cover image
});

module.exports = mongoose.model("Inventory", InventorySchema);
