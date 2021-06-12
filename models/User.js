const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  bookings: [
    {
      bookingNumber: {
        type: String,
        required: true,
      },
      bookingDate: {
        type: Date,
        required: true,
      },
      bookingTime: {
        type: [String],
        required: true,
      },
      bookingPrice: {
        type: [Number],
        required: true,
      },
    },
  ],
});

module.exports = User = mongoose.model("user", UserSchema);
