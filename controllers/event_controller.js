
const Event = require('../models/Event');

exports.createEvent = async (req, res) => {
    const { name, description, startDate, endDate } = req.body;
    const event = new Event({ name, description, startDate, endDate });
    await event.save();
    res.redirect('/events');
};


exports.getEvents = async (req, res) => {
    try {
        const events = await Event.find();
        res.json(events);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.lockRoom = async (req, res) => {
    const { eventId, roomId, isLocked } = req.body;
    const event = await Event.findById(eventId);
    const room = event.rooms.id(roomId);
    room.isLocked = isLocked;
    await event.save();
    res.send(`Room ${room.name} is now ${isLocked ? 'locked' : 'unlocked'}`);
};