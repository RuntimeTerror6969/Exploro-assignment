const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");
const cartController = require("../controllers/cartController");

// @route   GET api/cart
// @desc    Get user's cart
// @access  Private
router.get("/", auth, cartController.getCart);

// @route   POST api/cart
// @desc    Add item to cart
// @access  Private
router.post("/", auth, cartController.addToCart);

// @route   DELETE api/cart/:tripId
// @desc    Remove item from cart
// @access  Private
router.delete("/:tripId", auth, cartController.removeFromCart);

// @route   DELETE api/cart
// @desc    Clear cart
// @access  Private
router.delete("/", auth, cartController.clearCart);

module.exports = router;
