
const Event = require('../models/event_model');

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




exports.getEventById = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id).populate('rooms');
        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }
        res.status(200).json(event);
    } catch (error) {
        console.error("Error getting event by ID:", error);
        res.status(500).json({ error: 'Failed to get event' });
    }
};

exports.updateEvent = async (req, res) => {
    try {
        const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedEvent) {
            return res.status(404).json({ error: 'Event not found' });
        }
        res.status(200).json(updatedEvent);
    } catch (error) {
        console.error("Error updating event:", error);
        res.status(500).json({ error: 'Failed to update event' });
    }
};


exports.deleteEvent = async (req, res) => {
    try {
        const deletedEvent = await Event.findByIdAndDelete(req.params.id);
        if (!deletedEvent) {
            return res.status(404).json({ error: 'Event not found' });
        }
        res.status(204).end(); // 204 No Content for successful deletion
    } catch (error) {
        console.error("Error deleting event:", error);
        res.status(500).json({ error: 'Failed to delete event' });
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