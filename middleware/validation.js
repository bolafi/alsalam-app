const { check, validationResult } = require("express-validator");

exports.loginValidation = [
  check("email", "Email is required").isEmail(),
  check("password", "Please provide a valid Password").isLength({ min: 6 }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    next();
  },
];

exports.registerValidation = [
  check("name", "Name is required").not().isEmpty(),
  check("email", "Email is require").isEmail(),
  check("password", "Password should not be less than 6 characters").isLength({
    min: 6,
  }),
  check("phone", "Phone is required").not().isEmpty().isLength({
    min: 8,
  }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    next();
  },
];
