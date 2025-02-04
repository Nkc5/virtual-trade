// controllers/roomController.js
const Room = require('../models/Room');

exports.lockRoom = async (req, res) => {
    const { roomId, isLocked } = req.body;
    const room = await Room.findById(roomId);
    room.isLocked = isLocked;
    await room.save();
    res.json({ message: `Room ${room.name} is now ${isLocked ? 'locked' : 'unlocked'}` });
};