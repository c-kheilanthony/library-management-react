const fs = require("fs");
const path = require("path");

function showFolderStructure(dir, depth = 0) {
  const items = fs.readdirSync(dir);

  items.forEach((item) => {
    const itemPath = path.join(dir, item);
    const isDirectory = fs.statSync(itemPath).isDirectory();

    // Ignore node_modules and other unwanted folders
    if (item === "node_modules") return;

    console.log(`${" ".repeat(depth * 2)}- ${item}`);
    if (isDirectory) {
      showFolderStructure(itemPath, depth + 1);
    }
  });
}

const root = path.resolve(__dirname);
console.log("Folder Structure:");
showFolderStructure(root);
