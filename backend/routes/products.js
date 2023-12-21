const express = require("express");
const router = express.Router();
const cors = require("cors");
const {
  createProduct,
  getProduct,
  getProducts,
  deleteProduct,
  updateProduct,
} = require("../controllers/productController");
const requireAuth = require("../middleware/requireAuth");

router.use(cors());

//requring authorization for all routes
router.use(requireAuth);

//get all products
router.get("/all-products", getProducts);

//add a new product
router.post("/add-product", createProduct);

//get a single product
router.get("/get-product/:id", getProduct);

//delete a single product
router.delete("/delete-product/:id", deleteProduct);

//update a single product
router.patch("/update-product/:id", updateProduct);

module.exports = router;
