const mongoose = require('mongoose');


const boothSchema = new mongoose.Schema({
    vendorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor' },
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
    name: String,
    banner: String,
    row: Number,
    boothNumber: { type: String, required: true },
    media: [{ type: String }], // Cloudinary URLs
  });
  module.exports = mongoose.model('Booth', boothSchema);