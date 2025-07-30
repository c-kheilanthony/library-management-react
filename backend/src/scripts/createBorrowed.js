const mongoose = require("mongoose");
require("dotenv").config();

const BorrowedBook = require("../models/BorrowedBook");
const Request = require("../models/Request"); // Used only to copy request data
const Book = require("../models/Inventory"); // Optional: To confirm book exists

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Connection error:", err));

async function addBorrowedBook() {
  try {
    const requestId = "QIJZXGKP"; // Replace with actual request ID
    const librarianId = "LIB001"; // Example value; replace as needed

    const request = await Request.findById(requestId);
    if (!request) {
      console.error("Request not found.");
      process.exit(1);
    }

    // Optional check if book still exists in inventory
    const bookExists = await Book.findById(request.bookId);
    if (!bookExists) {
      console.error("Book not found in inventory.");
      process.exit(1);
    }

    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 7); // Set due 7 days from now

    const borrowed = new BorrowedBook({
      studentId: request.studentId,
      bookId: request.bookId,
      dueDate,
      approvedBy: librarianId, // Required field in the schema
    });

    await borrowed.save();

    console.log("✅ Borrowed book entry created successfully:");
    console.log(borrowed);

    // You can optionally delete the original request here
    // await request.deleteOne();

    process.exit();
  } catch (err) {
    console.error("❌ Error creating borrowed entry:", err);
    process.exit(1);
  }
}

addBorrowedBook();
