const mongoose = require("mongoose");

const rideSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    driver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Driver",
    },
    vehicleType: {
      type: String,
      enum: ["bike", "auto", "car"],
      required: true,
    },
    pickup: {
      address: String,
      location: {
        type: { type: String, default: "Point" },
        coordinates: [Number],
      },
    },
    destination: {
      address: String,
      location: {
        type: { type: String, default: "Point" },
        coordinates: [Number],
      },
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "started", "completed", "cancelled"],
      default: "pending",
    },
    price: {
      type: Number,
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },
    paymentMethod: {
      type: String,
      enum: ["card", "cash"],
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    feedback: String,
    startTime: Date,
    endTime: Date,
  },
  { timestamps: true }
);

rideSchema.index({ "pickup.location": "2dsphere" });
rideSchema.index({ "destination.location": "2dsphere" });

module.exports = mongoose.model("Ride", rideSchema);
