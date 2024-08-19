const Order = require("../models/orderModel");

// Create a new order
const createOrder = async (req, res) => {
    try {
        const { customerName, productTitle, quantity } = req.body;

        const newOrder = new Order({
            customerName,
            productTitle,
            quantity
        });

        const savedOrder = await newOrder.save();

        res.status(201).json(savedOrder);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

//  Get all orders
const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({});

        res.status(200).json(orders);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get a specific order by ID
const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ error: "Order not found" });
        }

        res.status(200).json(order);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { createOrder, getAllOrders, getOrderById };
