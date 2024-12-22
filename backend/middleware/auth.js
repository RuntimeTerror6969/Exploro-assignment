const jwt = require("jsonwebtoken");
const User = require("../models/User");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ error: "Authentication required" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    // Add user info to request object
    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid authentication token" });
  }
};

// Optional middleware to check if user is an organizer
const isOrganizer = async (req, res, next) => {
  try {
    if (!req.user.isOrganizer) {
      return res
        .status(403)
        .json({ error: "Access denied. Organizer privileges required." });
    }
    next();
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { auth, isOrganizer };
