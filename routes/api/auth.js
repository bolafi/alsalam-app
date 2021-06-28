const express = require("express");
const router = express.Router();
const { protect } = require("../../middleware/auth");
const { loginValidation } = require("../../middleware/validation");
const { login, getMe } = require("../../controllers/auth");

router.get("/", protect, getMe);
router.post("/", loginValidation, login);

module.exports = router;
