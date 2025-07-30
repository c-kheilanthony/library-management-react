const mongoose = require("mongoose");
const Inventory = require("../models/Inventory");
require("dotenv").config();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Sample Inventory Data
const inventoryData = [
  {
    category: ["Fiction", "Adventure"],
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    datePublished: "1937-09-21",
    isbn: "978-3-16-148410-0",
    copyIdentifier: "Copy 1",
  },
  {
    category: ["Fiction", "Adventure"],
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    datePublished: "1937-09-21",
    isbn: "978-3-16-148410-0",
    copyIdentifier: "Copy 2",
  },
  {
    category: ["Non-Fiction", "Science"],
    title: "A Brief History of Time",
    author: "Stephen Hawking",
    datePublished: "1988-04-01",
    isbn: "978-0-553-10953-5",
    copyIdentifier: "Copy 1",
  },
  // Additional data
  {
    category: ["Fiction", "Fantasy"],
    title: "Harry Potter and the Philosopher's Stone",
    author: "J.K. Rowling",
    datePublished: "1997-06-26",
    isbn: "978-0-7475-3269-9",
    copyIdentifier: "Copy 1",
  },
  {
    category: ["Fiction", "Fantasy"],
    title: "Harry Potter and the Chamber of Secrets",
    author: "J.K. Rowling",
    datePublished: "1998-07-02",
    isbn: "978-0-7475-3849-3",
    copyIdentifier: "Copy 1",
  },
  {
    category: ["Fiction", "Fantasy"],
    title: "The Fellowship of the Ring",
    author: "J.R.R. Tolkien",
    datePublished: "1954-07-29",
    isbn: "978-0-618-00222-8",
    copyIdentifier: "Copy 1",
  },
  {
    category: ["Fiction", "Fantasy"],
    title: "The Two Towers",
    author: "J.R.R. Tolkien",
    datePublished: "1954-11-11",
    isbn: "978-0-618-00223-5",
    copyIdentifier: "Copy 1",
  },
  {
    category: ["Fiction", "Fantasy"],
    title: "The Return of the King",
    author: "J.R.R. Tolkien",
    datePublished: "1955-10-20",
    isbn: "978-0-618-00224-2",
    copyIdentifier: "Copy 1",
  },
  {
    category: ["Non-Fiction", "History"],
    title: "Sapiens: A Brief History of Humankind",
    author: "Yuval Noah Harari",
    datePublished: "2011-02-04",
    isbn: "978-0-06-231609-7",
    copyIdentifier: "Copy 1",
  },
  {
    category: ["Non-Fiction", "Biography"],
    title: "Steve Jobs",
    author: "Walter Isaacson",
    datePublished: "2011-10-24",
    isbn: "978-1-4516-4853-9",
    copyIdentifier: "Copy 1",
  },
  {
    category: ["Non-Fiction", "Science"],
    title: "Cosmos",
    author: "Carl Sagan",
    datePublished: "1980-09-01",
    isbn: "978-0-394-50294-6",
    copyIdentifier: "Copy 1",
  },
  {
    category: ["Fiction", "Mystery"],
    title: "The Girl with the Dragon Tattoo",
    author: "Stieg Larsson",
    datePublished: "2005-09-01",
    isbn: "978-0-307-45454-6",
    copyIdentifier: "Copy 1",
  },
  {
    category: ["Fiction", "Thriller"],
    title: "Gone Girl",
    author: "Gillian Flynn",
    datePublished: "2012-06-05",
    isbn: "978-0-307-58836-4",
    copyIdentifier: "Copy 1",
  },
  {
    category: ["Fiction", "Romance"],
    title: "Pride and Prejudice",
    author: "Jane Austen",
    datePublished: "1813-01-28",
    isbn: "978-0-19-280238-5",
    copyIdentifier: "Copy 1",
  },
  {
    category: ["Non-Fiction", "Self-Help"],
    title: "Atomic Habits",
    author: "James Clear",
    datePublished: "2018-10-16",
    isbn: "978-0-7352-1127-4",
    copyIdentifier: "Copy 1",
  },
  {
    category: ["Fiction", "Adventure"],
    title: "Treasure Island",
    author: "Robert Louis Stevenson",
    datePublished: "1883-05-23",
    isbn: "978-0-14-132100-4",
    copyIdentifier: "Copy 1",
  },
  {
    category: ["Non-Fiction", "Business"],
    title: "The Lean Startup",
    author: "Eric Ries",
    datePublished: "2011-09-13",
    isbn: "978-0-307-88791-7",
    copyIdentifier: "Copy 1",
  },
  {
    category: ["Fiction", "Dystopian"],
    title: "1984",
    author: "George Orwell",
    datePublished: "1949-06-08",
    isbn: "978-0-452-28423-4",
    copyIdentifier: "Copy 1",
  },
  {
    category: ["Fiction", "Dystopian"],
    title: "Brave New World",
    author: "Aldous Huxley",
    datePublished: "1932-08-18",
    isbn: "978-0-06-085052-4",
    copyIdentifier: "Copy 1",
  },
  {
    category: ["Fiction", "Horror"],
    title: "It",
    author: "Stephen King",
    datePublished: "1986-09-15",
    isbn: "978-0-670-81302-5",
    copyIdentifier: "Copy 1",
  },
];

// Drop and Populate Inventory Data
const dropAndPopulateInventory = async () => {
  try {
    // Drop the Inventory collection

    // Insert new data
    await Inventory.insertMany(inventoryData);
    console.log("Inventory data populated successfully!");
  } catch (err) {
    if (err.code === 26) {
      console.log("Inventory collection does not exist. Skipping drop step.");
    } else {
      console.error("Error during drop or populate:", err);
    }
  } finally {
    mongoose.disconnect();
  }
};

dropAndPopulateInventory();
