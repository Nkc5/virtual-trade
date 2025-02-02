// controllers/boothController.js
const Booth = require('../models/Booth');

exports.createBooth = async (req, res) => {
    const { eventId, vendorId, boothNumber } = req.body;
    const booth = new Booth({ eventId, vendorId, boothNumber });
    await booth.save();
    res.redirect('/booths');
};

exports.uploadMedia = async (req, res) => {
    const { boothId } = req.params;
    const file = req.files.media;
    const result = await cloudinary.uploader.upload(file.tempFilePath);
    const booth = await Booth.findById(boothId);
    booth.media.push(result.secure_url);
    await booth.save();
    res.json({ message: 'Media uploaded successfully', url: result.secure_url });
};

// Get All Booths
exports.getBooths = async (req, res) => {
    try {
        const booths = await Booth.find();
        res.json(booths);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};