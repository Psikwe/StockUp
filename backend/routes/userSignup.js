const express = require("express");
const router = express.Router();
const cors = require("cors");
const { signup } = require("../controllers/userSignupController");

router.use(cors());
router.post("/signup", signup);

module.exports = router;
