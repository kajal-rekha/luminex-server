const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      unique: true,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },

    occupation: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["user", "seller", "admin"],
      default: "user",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
