const express = require("express");
const router = express.Router();
const inventoryController = require("../controllers/inventoryController");
const upload = require("../utils/upload");
console.log("Inventory routes initialized");

// GET /api/inventory - Fetch all inventory items
router.get("/", (req, res) => {
  console.log("GET /api/inventory hit");
  inventoryController.getInventory(req, res);
});

// POST /api/inventory/add - Add a new inventory item
router.post("/add", upload.single("coverImage"), (req, res) => {
  console.log("POST /api/inventory/add hit with body:", req.body);
  console.log("PUT request received. File:", req.file, "Body:", req.body);
  inventoryController.addInventoryItem(req, res);
});

// PUT /api/inventory/:id - Update an inventory item
router.put("/:id", upload.single("coverImage"), async (req, res) => {
  console.log("PUT /api/inventory/:id hit with id:", req.params.id);
  console.log("PUT request received. File:", req.file);
  console.log("PUT request received. Body:", req.body);

  inventoryController.updateInventoryItem(req, res);
});

// DELETE /api/inventory/:id - Delete an inventory item
router.delete("/:id", (req, res) => {
  console.log("DELETE /api/inventory/:id hit with id:", req.params.id);
  inventoryController.deleteInventoryItem(req, res);
});

module.exports = router;
