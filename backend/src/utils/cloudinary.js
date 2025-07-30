const cloudinary = require("cloudinary").v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // Add this to .env
  api_key: process.env.CLOUDINARY_API_KEY, // Add this to .env
  api_secret: process.env.CLOUDINARY_API_SECRET, // Add this to .env
});

module.exports = cloudinary;
