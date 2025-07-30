const express = require("express");
const BorrowedBook = require("../models/BorrowedBook");
const Book = require("../models/Inventory"); // To verify book existence

const router = express.Router();

// Create a new borrowed book entry
router.post("/", async (req, res) => {
  const { studentId, bookId, dueDate, approvedBy } = req.body;

  try {
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found in inventory" });
    }

    const newBorrowedBook = new BorrowedBook({
      studentId,
      bookId,
      dueDate,
      approvedBy,
    });

    await newBorrowedBook.save();
    res
      .status(201)
      .json({ message: "Book borrowed successfully", newBorrowedBook });
  } catch (error) {
    console.error("Error borrowing book:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
});

// Get all borrowed books
router.get("/", async (req, res) => {
  try {
    const borrowedBooks = await BorrowedBook.find().populate("bookId");
    res.json(borrowedBooks);
  } catch (error) {
    console.error("Error fetching borrowed books:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
});

// Get borrowed books by studentId
router.get("/:studentId", async (req, res) => {
  const { studentId } = req.params;

  try {
    const borrowedBooks = await BorrowedBook.find({ studentId }).populate(
      "bookId"
    );

    if (!borrowedBooks.length) {
      return res
        .status(404)
        .json({ message: "No borrowed books found for this student" });
    }

    res.json(borrowedBooks);
  } catch (error) {
    console.error("Error fetching borrowed books:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
});

module.exports = router;
