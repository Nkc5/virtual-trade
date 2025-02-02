const jwt = require("jsonwebtoken");
const { UnauthorizedError } = require("../utils/customError");

async function restrictToAccess(req, res, next) {
  try {
    const token = req.headers?.authorization?.split(" ")[1];
    if (!token) {
      throw new UnauthorizedError("Token is missing. Access denied!");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      throw new UnauthorizedError("Invalid token. Access denied!");
    }

    req.user = decoded;
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = restrictToAccess;
