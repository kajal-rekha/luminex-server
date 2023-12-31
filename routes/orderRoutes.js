const express = require("express");
const { createOrder, getAllOrders } = require("../controllers/orderController");
// const { isAdmin } = require("../middlewares/admin");
// const { isAuthenticated } = require("../middlewares/auth");

const router = express.Router();

// Create  order
router.post("/", createOrder);

// Get all orders
router.get("/", getAllOrders);

module.exports = router;
