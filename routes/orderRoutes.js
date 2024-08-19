const express = require("express");
const {
    createOrder,
    getAllOrders,
    getOrderById
} = require("../controllers/orderController");

const router = express.Router();

// Create an order
router.post("/", createOrder);

// Get all orders
router.get("/", getAllOrders);

// Get a specific order by ID
router.get("/:id", getOrderById);

module.exports = router;
