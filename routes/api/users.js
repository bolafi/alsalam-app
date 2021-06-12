const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Email is require").isEmail(),
    check(
      "password",
      "Password should not be less than 6 characters"
    ).isLength({ min: 6 }),
    check("phone", "Phone is required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password, phone } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res.status(401).json({ msg: "Email is exist" });
      }

      user = new User({ name, email, password, phone });

      // Encrypt password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();

      // create the token
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 36000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: "Server Error" });
    }
  }
);

// Get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ msg: "Server Error" });
  }
});

module.exports = router;
