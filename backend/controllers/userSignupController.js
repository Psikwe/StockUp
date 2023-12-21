const userSignup = require("../models/userSignupModel");
const jwt = require("jsonwebtoken");

const createToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET, { expiresIn: "1d" });
};

const signup = async (req, res) => {
  const { fullName, email, companyName, password } = req.body;
  try {
    const signup = await userSignup.signup(
      fullName,
      email,
      companyName,
      password
    );
    const token = createToken(signup._id);
    res.status(200).json({ message: "Success" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { signup };
