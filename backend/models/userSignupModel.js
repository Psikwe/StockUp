const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const validator = require("validator");

const userSignupSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  companyName: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

//static signup method
userSignupSchema.statics.signup = async function (
  fullName,
  email,
  companyName,
  password
) {
  const emailExists = await this.findOne({ email });
  const companyExists = await this.findOne({ companyName });
  if (emailExists) {
    throw Error("email already exists");
  }

  if (companyExists) {
    throw Error("Company name already used");
  }
  if (!fullName || !email || !companyName || !password) {
    throw Error("All fields are required");
  }

  if (!validator.isEmail(email)) {
    throw Error("Please enter a valid email");
  }

  if (!validator.isStrongPassword(password)) {
    throw Error("Not a strong password");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const userSignup = await this.create({
    fullName,
    email,
    companyName,
    password: hash,
  });
  return userSignup;
};

module.exports = mongoose.model("Signup", userSignupSchema);
