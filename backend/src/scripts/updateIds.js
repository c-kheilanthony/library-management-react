const mongoose = require("mongoose");
const Inventory = require("../models/Inventory"); // Adjust path to match your structure

// MongoDB connection string
const MONGODB_URI = process.env.MONGODB_URI || "your_connection_string_here";

const generateId = () => Math.random().toString(36).substr(2, 8).toUpperCase();

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log("Connected to MongoDB");

    try {
      // Fetch all records
      const items = await Inventory.find();

      for (const item of items) {
        const newId = generateId();

        // Update the ID
        await Inventory.updateOne({ _id: item._id }, { _id: newId });
        console.log(`Updated ID: ${item._id} -> ${newId}`);
      }

      console.log("ID update complete");
    } catch (error) {
      console.error("Error updating IDs:", error);
    } finally {
      mongoose.disconnect();
    }
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
