const path = require("path");
const fs = require("fs/promises");

async function deleteProfilePicture(filename) {
  const filePath = path.join(__dirname, "uploads", filename);

  try {
    // Delete the file using fs.promises.unlink
    await fs.unlink(filePath);
    console.log("File deleted successfully:", filename);
  } catch (error) {
    console.error("Error deleting file:", error);
    throw error; // You might want to handle or log the error accordingly
  }
}

module.exports = { deleteProfilePicture };
