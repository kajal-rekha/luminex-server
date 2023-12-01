const express = require("express");

const { loginUser, createUser, getAllUsers } = require("../controllers/userController");
const { isAdmin } = require("../middlewares/admin");
const { isAuthenticated } = require("../middlewares/auth");

// router
const router = express.Router();

// signup
router.post("/auth/register", createUser);

// login
router.post("/auth/login", loginUser);

// get all users
router.get("/", isAuthenticated, isAdmin, getAllUsers);

module.exports = router;
