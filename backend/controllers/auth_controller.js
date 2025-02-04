const bcrypt = require("bcryptjs");
const User = require("../models/user_model");
const Vendor = require("../models/vendor_model");
const { NotFoundError, BadRequestError } = require("../utils/customError");
const jwt = require('jsonwebtoken')

class Auth {
  register = async (req, res, next) => {
    const {
      firstName,
      lastName,
      email,
      password,
      ABN,
      role,
      business_name,
      mobilePhone,
      landline,
      countryCode,
      paypalLink,
      address,
    } = req.body;

    try {
      console.log("body", req.body);

      const isExist = await User.findOne({ email });

      if (isExist) {
        throw new BadRequestError("user already registered");
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = new User({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        country_code: countryCode,
        role
      });
      await user.save();

      if(req.user?.role === "SuperAdmin"){
        const vendor = new Vendor({
          userId: user._id,
          businessName: business_name,
          abnNumber: ABN,
          mobile: mobilePhone,
          landline: landline,
          address: address,
        });
        await vendor.save();
      }

      return res.status(201).json({
        error: false,
        message: "registered successfully",
      });
    } catch (error) {
      next(error);
    }
  };

  login = async (req, res, next) => {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({email});
      if (!user) {
        throw new NotFoundError("User not found");
      }

      const isVerified = await bcrypt.compare(password, user.password);

      if (!isVerified) {
        throw new BadRequestError("invalid password");
      }

      const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET
      );

      return res.status(200).json({
        error: false,
        message: "login successfully",
        data: { token, role: user.role },
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
}

module.exports = Auth;
