const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();
const SECRET = "your_secret_key"; // Replace with an environment variable in production

// Login route
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    console.log("Login attempt:", { username, password }); // Log login attempt

    const user = await User.findOne({ username });
    if (!user) {
      console.log("User not found"); // Log if user is not found
      return res.status(404).json({ message: "User not found" });
    }

    console.log("User found:", user); // Log user details

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("Invalid credentials"); // Log invalid credentials
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, SECRET, {
      expiresIn: "1h",
    });
    console.log("Sending response:", {
      token,
      role: user.role,
      username: user.username,
    });
    console.log("Login successful, token generated"); // Log successful login
    res.json({ token, role: user.role, username: user.username });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Error during login", error });
  }
});

module.exports = router;
