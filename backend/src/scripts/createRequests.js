const mongoose = require("mongoose");
require("dotenv").config();
const Request = require("../models/Request"); // Ensure this matches your folder structure

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Connection error:", err));

async function addRequest() {
  try {
    const request = new Request({
      studentId: "AC2021-0786", // Sample student ID
      bookId: "5LJWB5XZ", // Book ID from Inventory
    });

    await request.save();
    console.log("Request added successfully:", request);
    process.exit();
  } catch (err) {
    console.error("Error adding request:", err);
    process.exit(1);
  }
}

addRequest();
