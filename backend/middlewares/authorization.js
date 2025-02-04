const { ForbiddenError } = require("../utils/customError");

function authorizedRoles(...allowedRoles) {
  return (req, res, next) => {
    try {
      if (!req.user || !allowedRoles.includes(req.user.role)) {
        throw new ForbiddenError("You do not have the required permissions!");
      }
      next();
    } catch (error) {
      next(error);
    }
  };
}



module.exports = authorizedRoles;