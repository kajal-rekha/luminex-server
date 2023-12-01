const express = require("express");

const { loginUser, createUser, getAllUsers, updateUser, deleteUser, getAUser } = require("../controllers/userController");
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

// Get a user 
router.get("/:userId", isAuthenticated, isAdmin, getAUser);


// Update a user 
router.put("/:userId", isAuthenticated, isAdmin, updateUser);

// Delete a user 
router.delete("/:userId", isAuthenticated, isAdmin, deleteUser);

module.exports = router;
