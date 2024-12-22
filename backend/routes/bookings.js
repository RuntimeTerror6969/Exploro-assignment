const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");
const bookingController = require("../controllers/bookingController");

// @route   GET api/bookings
// @desc    Get user's bookings
// @access  Private
router.get("/user", auth, bookingController.getUserBookings);

router.get("/organizer", auth, bookingController.getUserBookings);

// @route   POST api/bookings
// @desc    Create booking
// @access  Private
router.post("/", auth, bookingController.createBooking);

// @route   PUT api/bookings/:id/cancel
// @desc    Cancel booking
// @access  Private
router.put("/:id/cancel", auth, bookingController.cancelBooking);

module.exports = router;
