const express = require("express");
const Ride = require("../models/Ride");
const auth = require("../middleware/auth");

const router = express.Router();

// Request a new ride
router.post("/", auth, async (req, res) => {
  try {
    const {
      pickup,
      destination,
      vehicleType,
      price,
      status,
      paymentMethod,
      paymentStatus,
    } = req.body;

    const ride = new Ride({
      user: req.userId,
      pickup,
      destination,
      vehicleType,
      price,
      status,
      paymentMethod,
      paymentStatus,
    });

    await ride.save();

    // Log successful creation
    console.log("Ride created:", ride);

    res.status(201).json(ride);
  } catch (error) {
    console.error("Server error creating ride:", error);
    res.status(500).json({
      message: "Error creating ride",
      error: error.message,
    });
  }
});

// Get ride history
router.get("/history", auth, async (req, res) => {
  try {
    const rides = await Ride.find({ user: req.userId })
      .sort({ createdAt: -1 })
      .populate("driver", "name rating");

    res.json(rides);
  } catch (error) {
    res.status(500).json({ message: "Error fetching ride history" });
  }
});

// Update ride status
router.put("/:id/status", auth, async (req, res) => {
  try {
    const { status } = req.body;
    const ride = await Ride.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      { $set: { status } },
      { new: true }
    );

    if (!ride) {
      return res.status(404).json({ message: "Ride not found" });
    }

    res.json(ride);
  } catch (error) {
    res.status(500).json({ message: "Error updating ride" });
  }
});

// Add rating and feedback
router.put("/:id/rate", auth, async (req, res) => {
  try {
    const { rating, feedback } = req.body;
    const ride = await Ride.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      { $set: { rating, feedback } },
      { new: true }
    );

    if (!ride) {
      return res.status(404).json({ message: "Ride not found" });
    }

    res.json(ride);
  } catch (error) {
    res.status(500).json({ message: "Error rating ride" });
  }
});

module.exports = router;
