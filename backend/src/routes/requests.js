const express = require("express");
const Request = require("../models/Request");
const Book = require("../models/Inventory"); // Assuming your inventory is stored in "Book" model

const router = express.Router();

// Create a new request
router.post("/", async (req, res) => {
  const { studentId, bookId } = req.body;

  try {
    console.log("New request attempt:", { studentId, bookId });

    // Check if the book exists in inventory
    const bookExists = await Book.findById(bookId);
    if (!bookExists) {
      console.log("Book not found:", bookId);
      return res.status(404).json({ message: "Book not found" });
    }

    // Create the request
    const newRequest = new Request({ studentId, bookId });
    await newRequest.save();

    console.log("Request created successfully:", newRequest);
    res.status(201).json({ message: "Request added successfully", newRequest });
  } catch (error) {
    console.error("Error creating request:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
});

// Get all requests
router.get("/", async (req, res) => {
  try {
    const requests = await Request.find();
    res.json(requests);
  } catch (error) {
    console.error("Error fetching requests:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
});

// Get requests by studentId
router.get("/:studentId", async (req, res) => {
  try {
    const { studentId } = req.params;
    const requests = await Request.find({ studentId });

    if (!requests.length) {
      return res
        .status(404)
        .json({ message: "No requests found for this student" });
    }

    res.json(requests);
  } catch (error) {
    console.error("Error fetching requests for student:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
});

// Delete a request by ID
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Delete request attempt:", id);

    // Find and delete the request
    const deletedRequest = await Request.findByIdAndDelete(id);

    if (!deletedRequest) {
      console.log("Request not found:", id);
      return res.status(404).json({ message: "Request not found" });
    }

    console.log("Request deleted successfully:", deletedRequest);
    res.json({ message: "Request deleted successfully", deletedRequest });
  } catch (error) {
    console.error("Error deleting request:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
});

module.exports = router;
