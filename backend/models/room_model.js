
const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
    name: { type: String, required: true }, // e.g., Auditorium, Seminar Room
    isLocked: { type: Boolean, default: false },
    accessCode: { type: String }, // Optional access code
    createdAt : {type: Date, default : Date.now}

});

module.exports = mongoose.model('Room', roomSchema);