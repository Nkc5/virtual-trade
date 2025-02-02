const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
  country_code: { type: String },
  paypalLink: { type: String },
  otp: { type: String },

  role: {
    type: String,
    enum: ["SuperAdmin", "Vendor", "Guest"],
    default: "Guest",
  },
  eventId: { type: String, required: true },
});

module.exports = mongoose.model("User", UserSchema);
