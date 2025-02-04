// controllers/boothController.js
const Booth = require("../models/Booth");

exports.createBooth = async (req, res, next) => {
  try {
    const { eventId, vendorId, boothNumber, rowNumber, media } = req.body;
    const booth = new Booth({
      eventId,
      vendorId,
      boothNumber,
      rowNumber,
      media,
    });
    await booth.save();

    return res.status(201).json({
        error : false,
        message:"booth created successfully",
        data : booth
    })
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.uploadMedia = async (req, res, next) => {
  const { boothId } = req.params;
  const file = req.files.media;
  const result = await cloudinary.uploader.upload(file.tempFilePath);
  const booth = await Booth.findById(boothId);
  booth.media.push(result.secure_url);
  await booth.save();
  res.json({ message: "Media uploaded successfully", url: result.secure_url });
};

// Get All Booths
exports.getBooths = async (req, res, next) => {
  try {
    const booths = await Booth.find();
    res.json(booths);
  } catch (error) {
    console.log(error);
    next(error);
  }
};


// get booth by id
exports.getBoothByID = async (req, res, next) => {

    try {
        const {id} = req.params;

        const booth = await Booth.findById(id);

        return res.status(200).json({
            error: false,
            message:"booth fetched successfully",
            data: booth
        })

    } catch (error) {
        console.log(error);
        next(error);
    }
}