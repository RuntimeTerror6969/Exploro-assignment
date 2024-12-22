const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");
const tripController = require("../controllers/tripController");

// @route   GET api/trips
// @desc    Get all trips
// @access  Public
router.get("/", tripController.getAllTrips);

// @route   GET api/trips/:id
// @desc    Get single trip
// @access  Public
router.get("/:id", tripController.getTrip);

// @route   POST api/trips
// @desc    Create new trip
// @access  Private (Organizers only)
router.post("/", auth, tripController.createTrip);

// @route   PUT api/trips/:id
// @desc    Update trip
// @access  Private (Organizers only)
router.put("/:id", auth, tripController.updateTrip);

// @route   DELETE api/trips/:id
// @desc    Delete trip
// @access  Private (Organizers only)
router.delete("/:id", auth, tripController.deleteTrip);

module.exports = router;
