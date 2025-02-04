const Vendor = require("../models/vendor_model");

exports.createVendor = async (req, res) => {
  try {
    const { userId, boothNumber, boothMedia, banners } = req.body;

    const newVendor = new Vendor({
      userId,
      boothNumber,
      boothMedia,
      banners,
    });

    await newVendor.save();

    res.status(201).json(newVendor);
  } catch (error) {
    console.error("Error creating vendor:", error);
    res.status(500).json({ error: "Failed to create vendor" });
  }
};

exports.getAllVendors = async (req, res) => {
  try {
    const vendors = await Vendor.find().populate("userId"); // Populate user details
    res.status(200).json(vendors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to get vendors" });
  }
};

exports.getVendorById = async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id).populate("userId");
    if (!vendor) {
      return res.status(404).json({ error: "Vendor not found" });
    }
    res.status(200).json(vendor);
  } catch (error) {
    console.error("Error getting vendor by ID:", error);
    res.status(500).json({ error: "Failed to get vendor" });
  }
};

exports.updateVendor = async (req, res) => {
  try {
    const updatedVendor = await Vendor.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedVendor) {
      return res.status(404).json({ error: "Vendor not found" });
    }
    res.status(200).json(updatedVendor);
  } catch (error) {
    console.error("Error updating vendor:", error);
    res.status(500).json({ error: "Failed to update vendor" });
  }
};

exports.deleteVendor = async (req, res) => {
  try {
    const deletedVendor = await Vendor.findByIdAndDelete(req.params.id);
    if (!deletedVendor) {
      return res.status(404).json({ error: "Vendor not found" });
    }
    res.status(204).end();
  } catch (error) {
    console.error("Error deleting vendor:", error);
    res.status(500).json({ error: "Failed to delete vendor" });
  }
};
