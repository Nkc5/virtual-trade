const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const http = require("http");
// const socketIo = require("socket.io");
const connectToDB = require("./config/db");
const {errorHandler} = require('./utils/customError');


// Load environment variables
dotenv.config();

// Initialize Express App
const app = express();
const server = http.createServer(app);
// const io = socketIo(server);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));






app.use(errorHandler);


const PORT = process.env.PORT;
const url = process.env.MONGO_URI;

app.listen(PORT, async () => {
  console.log("connected to port", PORT);
  await connectToDB(url);
});
