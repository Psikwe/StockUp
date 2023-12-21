const express = require("express");
const router = express.Router();
const cors = require("cors");
const { login } = require("../controllers/userLoginController");

router.use(cors());
router.post("/login", login);

module.exports = router;
