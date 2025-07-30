const mongoose = require("mongoose");

const generateId = () => Math.random().toString(36).substr(2, 8).toUpperCase();

const RequestSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: generateId, // Custom ID generator
  },
  studentId: {
    type: String,
    required: true, // Student ID (e.g., AC2021-0786)
  },
  bookId: {
    type: String,
    required: true, // Book ID from Inventory
  },
  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending",
  },
  createdAt: {
    type: Date,
    default: Date.now, // Timestamp when the request was created
  },
});

module.exports = mongoose.model("Request", RequestSchema);
