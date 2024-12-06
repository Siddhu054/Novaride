const mongoose = require("mongoose");

const VEHICLE_TYPES = ["bike", "auto", "car"];

const driverSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: true,
    },
    vehicle: {
      type: {
        type: String,
        enum: VEHICLE_TYPES,
        required: true,
      },
      model: String,
      plate: String,
      color: String,
    },
    location: {
      type: {
        type: String,
        default: "Point",
      },
      coordinates: [Number],
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    rating: {
      type: Number,
      default: 0,
    },
    totalRides: {
      type: Number,
      default: 0,
    },
    currentRide: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ride",
    },
  },
  { timestamps: true }
);

driverSchema.index({ location: "2dsphere" });
driverSchema.statics.VEHICLE_TYPES = VEHICLE_TYPES;

module.exports = mongoose.model("Driver", driverSchema);
