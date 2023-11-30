const mongoose = require("mongoose");
const Product = require("../models/productModel");

// get all products
const getAllProducts = async (req, res) => {
  const products = await Product.find({});
  res.status(200).json(products);
};
// get a single product
const getSingleProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid id" });
  }
  const product = await Product.findById(id);

  if (!product) {
    return res.status(404).json({ error: "No product found!" });
  }
  if (product) {
    res.status(200).json(product);
  }
};

// post a new product
const postProduct = async (req, res) => {
  const data = req.body;

  try {
    const product = await Product.create({
      ...data,
    });

    res.status(200).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
// delete a product

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid id" });
  }
  const product = await Product.findOneAndDelete({ _id: id });

  if (!product) {
    return res.status(404).json({ error: "No product found!" });
  }
  res.status(200).json(product);
};

//udpate a product
const updateProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid id" });
  }
  const product = await Product.findOneAndUpdate({ _id: id }, { ...req.body });

  if (!product) {
    return res.status(404).json({ error: "No product found!" });
  }
  res.status(200).json(product);
};

module.exports = {
  postProduct,
  getAllProducts,
  getSingleProduct,
  deleteProduct,
  updateProduct,
};
