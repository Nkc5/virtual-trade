const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const http = require("http");
const cors = require('cors')
// const socketIo = require("socket.io");
const connectToDB = require("./config/db");
const {errorHandler} = require('./utils/customError');
const authRouter = require('./routes/auth_routes');
const eventRouter = require('./routes/event_routes');
const vendorRouter = require('./routes/vendor_routes');
const userRouter = require('./routes/user_routes');

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
app.use(cors())


app.use('/auth', authRouter)
app.use('/event', eventRouter)
app.use('/vendor', vendorRouter)
app.use('/user', userRouter)



app.use(errorHandler);


const PORT = process.env.PORT;
const url = process.env.MONGO_URI;

app.listen(PORT, async () => {
  console.log("connected to port", PORT);
  await connectToDB(url);
});
