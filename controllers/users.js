const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ****************************************************************************************************//
//@route    POST api/users
//@desc     Create new user
//@access   Public
exports.register = async (req, res, next) => {
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
      process.env.JWT_SECRET,
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
};

// ****************************************************************************************************//
//@route    GET api/users
//@desc     Get all users {for test only not to be used on frontend }
//@access   Private
exports.getAll = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ msg: "Server Error" });
  }
};
