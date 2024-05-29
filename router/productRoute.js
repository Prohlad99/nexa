// external imports
const express = require("express");

// internal imports

const {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct,
} = require("../controller/productController");

const router = express.Router();

// add product
router.post("/", createProduct);

// get all products
router.get("/", getAllProducts);

//get product by id
router.get("/:id", getProductById);

//update product by id
router.put("/:id", updateProduct);

// remove product
router.delete("/:id", deleteProduct);

module.exports = router;
