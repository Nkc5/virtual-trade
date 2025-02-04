const { Router } = require("express");
const {
  createVendor,
  getAllVendors,
  getVendorById,
  updateVendor,
  deleteVendor,
} = require("../controllers/vendor_controller");
const restrictToAccess = require("../middlewares/authentication");
const authorizedRoles = require("../middlewares/authorization");

const router = Router();

router.post(
  "/create",
  restrictToAccess,
  authorizedRoles("SuperAdmin"),
  createVendor
);
router.get(
  "/all",
  restrictToAccess,
  authorizedRoles("SuperAdmin"),
  getAllVendors
);
router.get(
  "/:id",
  restrictToAccess,
  authorizedRoles("SuperAdmin"),
  getVendorById
);
router.put(
  "/:id",
  restrictToAccess,
  authorizedRoles("SuperAdmin"),
  updateVendor
);
router.delete(
  "/:id",
  restrictToAccess,
  authorizedRoles("SuperAdmin"),
  deleteVendor
);

module.exports = router;
