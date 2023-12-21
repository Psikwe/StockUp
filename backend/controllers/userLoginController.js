const userLogin = require("../models/userLoginModel");
const jwt = require("jsonwebtoken");

const currentDateTime = new Date();
const year = currentDateTime.getFullYear();
const month = currentDateTime.getMonth() + 1;
const day = currentDateTime.getDate();
const hours = currentDateTime.getHours();
const minutes = currentDateTime.getMinutes();
const seconds = currentDateTime.getSeconds();
const formattedExpiryDateTime = `${year}-${month}-${day} ${
  hours + 3
}:${minutes}:${seconds}`;

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3h" });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const login = await userLogin.login(email, password);
    const token = createToken(login._id);

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        token,
        // expiry: formattedExpiryDateTime,
      },
    });
  } catch (error) {
    res.status(400).json({ success: "false", message: error.message });
  }
};

module.exports = { login };
