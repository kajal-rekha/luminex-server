const express = require("express");
const {
  postProduct,
  getAllProducts,
  getSingleProduct,
  deleteProduct,
  updateProduct,
} = require("../controllers/productController");

// router
const router = express.Router();

// GET all products
router.get("/", getAllProducts);

// GET a single product
router.get("/:id", getSingleProduct);

// POST a new product
router.post("/", postProduct);

// DELETE a product
router.delete("/:id", deleteProduct);

// UPDATE a product
router.patch("/:id", updateProduct);
module.exports = router;
