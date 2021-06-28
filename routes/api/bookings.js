const express = require("express");
const router = express.Router();
const { protect } = require("../../middleware/auth");
const { getBookings, createBooking } = require("../../controllers/bookings");

router.post("/all", getBookings);
router.post("/", protect, createBooking);

module.exports = router;
