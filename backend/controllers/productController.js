const Product = require("../models/productsModel");
const mongoose = require("mongoose");

//get all products
const getProducts = async (req, res) => {
  try {
    const user_id = req.user._id;

    const products = await Product.find({ user_id }).sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

//get a single product
const getProduct = async (req, res) => {
  //all route parameters are stored in the  params property so req.params
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ error: "Invalid id" });
  }
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ error: "No such product" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//create a new product
const createProduct = async (req, res) => {
  const { name, code, description, quantity, unitPrice } = req.body;

  let emptyFields = [];
  if (!name) {
    emptyFields.push("name");
  }
  if (!code) {
    emptyFields.push("code");
  }
  if (!description) {
    emptyFields.push("description");
  }
  if (!quantity) {
    emptyFields.push("quantity");
  }
  if (!unitPrice) {
    emptyFields.push("unitPrice");
  }

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all fields", emptyFields });
  }

  //add product to db
  try {
    const user_id = req.user._id;
    const product = await Product.create({
      name,
      code,
      description,
      quantity,
      unitPrice,
      user_id,
    });
    res.status(200).json({ product, message: "Success" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//delete a single product
const deleteProduct = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    res.status(404).json({ error: "invalid id" });

  try {
    const product = await Product.findOneAndDelete(id);
    if (!product) return res.status(404).json({ error: "no such product" });

    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//update a single product
const updateProduct = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ error: "invalid id" });
  }
  try {
    const product = await Product.findOneAndUpdate(
      { _id: id },
      { ...req.body }
    );
    res.status(200).json({ product });
    if (!product) {
      res.status(404).json({ error: "product not found" });
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProduct,
  deleteProduct,
  updateProduct,
};
