const Inventory = require("../models/Inventory");
// Fetch all inventory items
exports.getInventory = async (req, res) => {
  console.log("getInventory function called");
  try {
    const inventory = await Inventory.find();
    res.json(inventory);
  } catch (err) {
    console.error("Error fetching inventory data:", err);
    res.status(500).json({ error: "Failed to fetch inventory data" });
  }
};
// Add a new inventory item
exports.addInventoryItem = async (req, res) => {
  try {
    console.log("Request file:", req.file);
    const { category, title, author, datePublished, isbn, copyIdentifier } =
      req.body;
    const newBook = new Inventory({
      category: category.split(","), // Assuming categories are comma-separated
      title,
      author,
      datePublished,
      isbn,
      copyIdentifier,
      coverImage: req.file?.path || "", // Cloudinary URL or empty if no image
    });
    await newBook.save();
    console.log("Book added:", newBook);
    res.status(201).json({ message: "Book added successfully", book: newBook });
  } catch (error) {
    console.error("Error adding inventory item:", error);
    res.status(500).json({ error: "Failed to add book" });
  }
};
// Update an inventory item
exports.updateInventoryItem = async (req, res) => {
  try {
    console.log("🔄 PUT Request Received for ID:", req.params.id);
    console.log("📦 Received Body:", req.body);
    console.log("📷 Received File:", req.file);

    const { id } = req.params;
    const updatedFields = { ...req.body };
    // Check if a new cover image is uploaded
    if (req.file) {
      console.log("✅ New Cover Image Received:", req.file.path);
      updatedFields.coverImage = req.file.path;
    } else {
      console.log("⚠️ No new image uploaded.");
    }

    const updatedBook = await Inventory.findByIdAndUpdate(id, updatedFields, {
      new: true, // Return the updated document
      runValidators: true, // Ensure validation is run
    });

    if (!updatedBook) {
      console.log("Book not found with id:", id);
      return res.status(404).json({ error: "Book not found" });
    }

    console.log("Book updated:", updatedBook);
    res
      .status(200)
      .json({ message: "Book updated successfully", book: updatedBook });
  } catch (error) {
    console.error("Error updating inventory item:", error);
    res
      .status(500)
      .json({ error: "Failed to update book", details: error.message });
  }
};
// Delete an inventory item
exports.deleteInventoryItem = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Deleting inventory item with id:", id);
    const deletedBook = await Inventory.findByIdAndDelete(id);
    if (!deletedBook) {
      console.log("Book not found with id:", id);
      return res.status(404).json({ error: "Book not found" });
    }
    console.log("Book deleted:", deletedBook);
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    console.error("Error deleting inventory item:", error);
    res.status(500).json({ error: "Failed to delete book" });
  }
};
