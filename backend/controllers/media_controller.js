// controllers/mediaController.js
const cloudinary = require('../config/cloudinary');

exports.uploadMedia = async (req, res) => {
    const file = req.files.media;
    const result = await cloudinary.uploader.upload(file.tempFilePath);
    res.json({ url: result.secure_url });
};