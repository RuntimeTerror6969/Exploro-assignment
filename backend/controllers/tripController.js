const Trip = require("../models/Trip");

const tripController = {
  // Get all trips
  getAllTrips: async (req, res) => {
    try {
      const trips = await Trip.find()
        .populate("organizer", "email")
        .sort({ createdAt: -1 });
      res.json(trips);
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  },

  // Get single trip
  getTrip: async (req, res) => {
    try {
      const trip = await Trip.findById(req.params.id).populate(
        "organizer",
        "email"
      );

      if (!trip) {
        return res.status(404).json({ error: "Trip not found" });
      }

      res.json(trip);
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  },

  // Create new trip (organizers only)
  createTrip: async (req, res) => {
    try {
      const { name, description, startDate, endDate, price, availableSlots } =
        req.body;

      // Validate dates
      if (new Date(startDate) >= new Date(endDate)) {
        return res
          .status(400)
          .json({ error: "End date must be after start date" });
      }

      const trip = new Trip({
        name,
        description,
        startDate,
        endDate,
        price,
        availableSlots,
        organizer: req.user._id,
      });

      await trip.save();
      res.status(201).json(trip);
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  },

  // Update trip (organizers only)
  updateTrip: async (req, res) => {
    try {
      const { name, description, startDate, endDate, price, availableSlots } =
        req.body;

      let trip = await Trip.findById(req.params.id);

      if (!trip) {
        return res.status(404).json({ error: "Trip not found" });
      }

      // Verify organizer ownership
      if (trip.organizer.toString() !== req.user._id.toString()) {
        return res.status(403).json({ error: "Not authorized" });
      }

      // Validate dates if they're being updated
      if (startDate && endDate && new Date(startDate) >= new Date(endDate)) {
        return res
          .status(400)
          .json({ error: "End date must be after start date" });
      }

      trip = await Trip.findByIdAndUpdate(
        req.params.id,
        { name, description, startDate, endDate, price, availableSlots },
        { new: true }
      );

      res.json(trip);
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  },

  // Delete trip (organizers only)
  deleteTrip: async (req, res) => {
    try {
      const trip = await Trip.findById(req.params.id);

      if (!trip) {
        return res.status(404).json({ error: "Trip not found" });
      }

      // Verify organizer ownership
      if (trip.organizer.toString() !== req.user._id.toString()) {
        return res.status(403).json({ error: "Not authorized" });
      }

      await trip.remove();
      res.json({ message: "Trip removed" });
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  },
};

module.exports = tripController;
