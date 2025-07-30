const express = require("express");
const router = express.Router();
const Book = require("../models/Book");

// Create a new book
router.post("/", async (req, res) => {
  try {
    console.log("Request Body:", req.body); // Log incoming data
    const { title, author } = req.body;
    const newBook = new Book({ title, author });
    const savedBook = await newBook.save();
    console.log("Saved Book:", savedBook); // Log saved book
    res.status(201).json(savedBook);
  } catch (err) {
    console.error("Error saving book:", err);
    res.status(400).json({ message: err.message });
  }
});

// Get all books
router.get("/", async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
