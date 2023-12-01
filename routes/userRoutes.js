const express = require("express");

const { loginUser, createUser, getAllUsers, updateUser, deleteUser, getAnUser } = require("../controllers/userController");
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

// Get an user 
router.get("/:userId", isAuthenticated, isAdmin, getAnUser);


// Update an user 
router.put("/:userId", isAuthenticated, isAdmin, updateUser);

// Delete an user 
router.delete("/:userId", isAuthenticated, isAdmin, deleteUser);

module.exports = router;
