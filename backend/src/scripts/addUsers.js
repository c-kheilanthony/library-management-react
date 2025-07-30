const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");
require("dotenv").config();

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Connection error:", err));

async function addUsers() {
  try {
    const hashedPassword = await bcrypt.hash("password123", 10);

    const users = [
      { username: "AC2021-0787", password: hashedPassword, role: "Student" },
    ];

    await User.insertMany(users);
    console.log("Users added successfully");
    process.exit();
  } catch (err) {
    console.error("Error adding users:", err);
    process.exit(1);
  }
}

addUsers();
