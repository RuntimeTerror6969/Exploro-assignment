const Cart = require("../models/Cart");
const Trip = require("../models/Trip");

const cartController = {
  // Get user's cart
  getCart: async (req, res) => {
    try {
      let cart = await Cart.findOne({ user: req.user._id }).populate(
        "items.trip"
      );

      if (!cart) {
        cart = new Cart({ user: req.user._id, items: [] });
        await cart.save();
      }

      res.json(cart);
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  },

  // Add item to cart
  addToCart: async (req, res) => {
    try {
      const { tripId, quantity = 1 } = req.body;

      // Validate trip
      const trip = await Trip.findById(tripId);
      if (!trip) {
        return res.status(404).json({ error: "Trip not found" });
      }

      // Check availability
      if (trip.availableSlots < quantity) {
        return res.status(400).json({ error: "Not enough available slots" });
      }

      let cart = await Cart.findOne({ user: req.user._id });

      if (!cart) {
        cart = new Cart({ user: req.user._id, items: [] });
      }

      // Check if trip already in cart
      const existingItem = cart.items.find(
        (item) => item.trip.toString() === tripId
      );

      if (existingItem) {
        existingItem.quantity = quantity;
        existingItem.price = trip.price;
      } else {
        cart.items.push({
          trip: tripId,
          quantity,
          price: trip.price,
        });
      }

      await cart.save();

      // Populate trip details before sending response
      cart = await cart.populate("items.trip");

      res.json(cart);
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  },

  // Remove item from cart
  removeFromCart: async (req, res) => {
    try {
      const { tripId } = req.params;

      let cart = await Cart.findOne({ user: req.user._id });

      if (!cart) {
        return res.status(404).json({ error: "Cart not found" });
      }

      cart.items = cart.items.filter((item) => item.trip.toString() !== tripId);

      await cart.save();

      // Populate trip details before sending response
      cart = await cart.populate("items.trip");

      res.json(cart);
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  },

  // Clear cart
  clearCart: async (req, res) => {
    try {
      let cart = await Cart.findOne({ user: req.user._id });

      if (!cart) {
        return res.status(404).json({ error: "Cart not found" });
      }

      cart.items = [];
      await cart.save();

      res.json(cart);
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  },
};

module.exports = cartController;
