const mongoose = require("mongoose");

async function connectToDB(url) {
  try {
    mongoose.connect(url);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
}


module.exports = connectToDB;