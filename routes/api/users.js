const express = require("express");
const router = express.Router();
const { protect } = require("../../middleware/auth");
const { registerValidation } = require("../../middleware/validation");
const { register, getAll } = require("../../controllers/users");

router.get("/", protect, getAll);
router.post("/", registerValidation, register);

module.exports = router;
