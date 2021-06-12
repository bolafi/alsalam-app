const express = require("express");
const router = express.Router();
const Booking = require("../../models/Booking");
const User = require("../../models/User");
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const { Slots } = require("../../models/enumValues");
const shortid = require("shortid");

//@route    POST api/booking/all
//@desc     get all the user's booking of the current date
//@access   Public
router.post("/all", async (req, res) => {
  try {
    const { selectedDate } = req.body;
    const bookings = await Booking.find({
      selectedDate: new Date(selectedDate),
    });

    res.status(200).json({ data: bookings });
  } catch (err) {
    res.status(500).json("Server Error");
  }
});

//@route    POST api/booking
//@desc    Create new booking
//@access   Private
router.post("/", auth, async (req, res) => {
  const userId = req.user.id;
  const { selectedDate, timeSlot } = req.body;
  let slots = timeSlot.map((slot) => Slots[slot]);

  try {
    const checkBooking = await Booking.find({ selectedDate });

    const checkSlots = checkBooking.map((booking) => booking.timeSlot.slot);

    // Make all saved slots in one array
    const flatSlot = checkSlots.flat();

    // Check if slot is exist

    const isExist = flatSlot.some((flatten) =>
      slots.some((slot) => slot.time === flatten.time)
    );

    if (isExist) {
      return res.status(400).json({ msg: "Slot is already booked" });
    }

    const newBooking = await Booking.create({
      selectedDate,
      timeSlot: { slot: slots, user: userId },
    });

    // Add the booking to my bookings in the profile
    const booking = {};
    booking.bookingNumber = shortid.generate();
    booking.bookingDate = newBooking.selectedDate;
    booking.bookingTime = newBooking.timeSlot.slot.map((item) => item.time);
    booking.bookingPrice = newBooking.timeSlot.slot.map((item) => item.price);

    const user = await User.findOne({ _id: userId });
    user.bookings.unshift(booking);
    await user.save();

    res.status(200).json({ data: newBooking });
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
});

module.exports = router;
