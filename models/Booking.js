const mongoose = require("mongoose");
const { Slots } = require("./enumValues");

const BookingSchema = new mongoose.Schema({
  selectedDate: {
    type: Date,
    required: true,
  },
  timeSlot: {
    slot: [{ type: Object, enum: Object.values(Slots) }],
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "user",
    },
  },
});

module.exports = Booking = mongoose.model("booking", BookingSchema);
