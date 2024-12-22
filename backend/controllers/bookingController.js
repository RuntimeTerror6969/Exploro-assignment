const Booking = require("../models/Booking");
const Trip = require("../models/Trip");

const bookingController = {
  // Get user's bookings
  getUserBookings: async (req, res) => {
    try {
      const bookings = await Booking.find({ user: req.user._id }).populate(
        "trip"
      );
      res.json(bookings);
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  },

  // Create booking
  createBooking: async (req, res) => {
    try {
      const { tripId, quantity } = req.body;

      const trip = await Trip.findById(tripId);
      if (!trip) {
        return res.status(404).json({ error: "Trip not found" });
      }

      if (trip.availableSlots < quantity) {
        return res.status(400).json({ error: "Not enough available slots" });
      }

      const booking = new Booking({
        user: req.user._id,
        trip: tripId,
        quantity,
        totalAmount: trip.price * quantity,
        status: "confirmed",
      });

      // Update available slots
      trip.availableSlots -= quantity;
      await trip.save();

      await booking.save();
      res.status(201).json(booking);
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  },

  // Cancel booking
  cancelBooking: async (req, res) => {
    try {
      const booking = await Booking.findById(req.params.id);

      if (!booking) {
        return res.status(404).json({ error: "Booking not found" });
      }

      if (booking.user.toString() !== req.user._id.toString()) {
        return res.status(403).json({ error: "Not authorized" });
      }

      const trip = await Trip.findById(booking.trip);

      // Calculate refund based on cancellation policy
      const daysUntilTrip = Math.ceil(
        (trip.startDate - new Date()) / (1000 * 60 * 60 * 24)
      );

      let refundPercentage = 0;
      if (daysUntilTrip >= 15) {
        refundPercentage = 100;
      } else if (daysUntilTrip >= 7) {
        refundPercentage = 50;
      }

      booking.status = "cancelled";
      booking.refundAmount = (booking.totalAmount * refundPercentage) / 100;

      // Restore available slots
      trip.availableSlots += booking.quantity;

      await Promise.all([booking.save(), trip.save()]);

      res.json(booking);
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  },
};

module.exports = bookingController;
