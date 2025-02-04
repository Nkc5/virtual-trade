const mongoose = require('mongoose');


const vendorSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  businessName: { type: String, },
  abnNumber: { type: String, },
  address: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      country: { type: String, required: true },
      postcode: { type: String, required: true },
  },
  mobile: { type: String },
  landline: { type: String },
  media: [{ type: String }], // Cloudinary URLs
  createdAt : {type: Date, default : Date.now}

});

module.exports = mongoose.model('Vendor', vendorSchema);