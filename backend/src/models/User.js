const mongoose = require("mongoose");

const generateId = () => Math.random().toString(36).substr(2, 8).toUpperCase();

const UserSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: generateId, // Custom ID generator
  },
  username: { type: String, required: true },
  role: { type: String, required: true },
  password: { type: String, required: true },
});

module.exports = mongoose.model("User", UserSchema);
