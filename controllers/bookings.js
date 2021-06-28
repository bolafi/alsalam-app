const User = require("../models/User");
const { Slots } = require("../models/enumValues");
const Booking = require("../models/Booking");
const shortid = require("shortid");

// ****************************************************************************************************//
//@route    POST api/booking/all
//@desc     get all the user's booking of the current date
//@access   Public
exports.getBookings = async (req, res, next) => {
  try {
    const { selectedDate } = req.body;
    const bookings = await Booking.find({
      selectedDate: new Date(selectedDate),
    });

    res.status(200).json({ data: bookings });
  } catch (err) {
    res.status(500).json("Server Error");
  }
};

// ********************************************************************************************************//

//@route    POST api/booking
//@desc     Create new booking
//@access   Private
exports.createBooking = async (req, res) => {
  const userId = req.user.id;
  const { selectedDate, timeSlot } = req.body;
  let slots = timeSlot.map((slot) => Slots[slot]);

  try {
    // Get the booking of selected date
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

    // Create New Booking
    const newBooking = await Booking.create({
      selectedDate,
      timeSlot: { slot: slots, user: userId },
    });

    // Add the booking to my profile
    const booking = {};
    // Create Booking Number
    booking.bookingNumber = shortid.generate();
    // add the selected date
    booking.bookingDate = newBooking.selectedDate;
    // add the booked time
    booking.bookingTime = newBooking.timeSlot.slot.map((item) => item.time);
    // add the total price of bookings
    booking.bookingPrice = newBooking.timeSlot.slot
      .map((item) => item.price)
      .reduce((total, amount) => total + amount);

    // Get the user and add the booking object
    const user = await User.findOne({ _id: userId });
    user.bookings.unshift(booking);
    await user.save();

    res.status(200).json({ data: newBooking });
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
};
