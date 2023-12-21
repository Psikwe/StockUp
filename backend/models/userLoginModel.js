const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const validator = require("validator");
const userSignup = require("./userSignupModel");

const userLoginSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userLoginSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields are required");
  }

  const userLogin = await userSignup.findOne({ email });
  if (!userLogin) {
    throw Error("Incorrect email");
  }

  const passwordMatch = await bcrypt.compare(password, userLogin.password);
  if (!passwordMatch) {
    throw Error("Invalid password");
  }

  return userLogin;
};

module.exports = mongoose.model("Login", userLoginSchema);
