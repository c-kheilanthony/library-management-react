const mongoose = require("mongoose");

const generateId = () => Math.random().toString(36).substr(2, 8).toUpperCase();

const BorrowedBookSchema = new mongoose.Schema({
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
    required: true,
    ref: "Inventory",
  },

  borrowedAt: {
    type: Date,
    default: Date.now, // Timestamp when the request was created
  },
  dueDate: {
    type: Date,
    required: true,
  },
  approvedBy: {
    type: String,
    required: true, // ID of the librarian who approved the request
  },
});

const BorrowedBook = mongoose.model("BorrowedBook", BorrowedBookSchema);

module.exports = BorrowedBook;
