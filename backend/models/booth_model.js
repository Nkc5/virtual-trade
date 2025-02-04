const mongoose = require('mongoose');


const boothSchema = new mongoose.Schema({
    vendorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor' },
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
    name: String,
    banner: String,
    rowNumber: Number,  // Row number for booth location
    boothNumber: { type: String, required: true },
    media: [{ type: String }],  // Array of image/video URLs from Cloudinary
    chatHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Chat' }], // Reference to Chat messages
    createdAt : {type: Date, default : Date.now}
  });
  module.exports = mongoose.model('Booth', boothSchema);