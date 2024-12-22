const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(
    process.env.MONGODB_URI || "mongodb://localhost:27017/travel-website"
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Define Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/trips", require("./routes/trips"));
app.use("/api/bookings", require("./routes/bookings"));
app.use("/api/cart", require("./routes/cart"));
// app.use("/api/organizers", require("./routes/organizers"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
