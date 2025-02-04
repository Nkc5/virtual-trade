const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    receiverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Could be another user or a booth
    message: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    boothId: { type: mongoose.Schema.Types.ObjectId, ref: 'Booth' }, // Optional: if the chat is within a booth
    createdAt : {type: Date, default : Date.now}

});

module.exports = mongoose.model('Chat', chatSchema);