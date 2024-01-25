const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    line_items: Object,
    customerName: {
      type: String,
      required: true,
    },
    productTitle: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    delivery_status: { type: String, default: "pending" },
    payment_status: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
