const mongoose = require('mongoose');


const vendorSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  businessName: { type: String, required: true },
  abnNumber: { type: String, required: true },
  address: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      country: { type: String, required: true },
      postcode: { type: String, required: true },
  },
  mobile: { type: String, required: true },
  landline: { type: String },
  media: [{ type: String }], // Cloudinary URLs
});

module.exports = mongoose.model('Vendor', vendorSchema);