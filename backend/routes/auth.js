const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");
const authController = require("../controllers/authController");

// @route   POST api/auth/register
// @desc    Register a user
// @access  Public
router.post("/register", authController.register);

// @route   POST api/auth/login
// @desc    Login user
// @access  Public
router.post("/login", authController.login);

// @route   GET api/auth/me
// @desc    Get current user
// @access  Private
router.get("/me", auth, authController.getCurrentUser);

module.exports = router;