const express = require("express");

// router
const router = express.Router();

// GET all products
router.get("/", (req, res) => {
  res.json({ message: "GET all products" });
});

// GET a single product
router.get("/:id", (req, res) => {
  res.json({ message: "GET a single product" });
});

// POST a new product
router.post("/", (req, res) => {
  res.json({ message: "POST a new product" });
});

// DELETE a product
router.delete("/:id", (req, res) => {
  res.json({ message: "DELETE a product" });
});

// UPDATE a product
router.patch("/:id", (req, res) => {
  res.json({ message: "UPDATE a product" });
});
module.exports = router;
