const express = require("express");
const router = express.Router();

const vehiclePricing = {
  bike: {
    basePrice: 20,
    perKm: 8,
    perMinute: 1,
    name: "Bike",
    description: "Fast & affordable",
    icon: "🛵",
  },
  auto: {
    basePrice: 30,
    perKm: 12,
    perMinute: 1.5,
    name: "Auto",
    description: "Comfortable for 3",
    icon: "🛺",
  },
  car: {
    basePrice: 50,
    perKm: 15,
    perMinute: 2,
    name: "Car",
    description: "Premium comfort",
    icon: "🚗",
  },
};

// Get available vehicle types and pricing
router.get("/types", (req, res) => {
  try {
    const vehicleTypes = Object.entries(vehiclePricing).map(([type, data]) => ({
      type,
      name: data.name,
      description: data.description,
      icon: data.icon,
      pricing: {
        basePrice: data.basePrice,
        perKm: data.perKm,
        perMinute: data.perMinute,
      },
    }));

    console.log("Sending vehicle types:", vehicleTypes);
    res.json(vehicleTypes);
  } catch (error) {
    console.error("Error fetching vehicle types:", error);
    res.status(500).json({ message: "Error fetching vehicle types" });
  }
});

// Calculate fare estimate
router.post("/estimate", (req, res) => {
  try {
    const { vehicleType, distance, duration } = req.body;
    const pricing = vehiclePricing[vehicleType];

    if (!pricing) {
      return res.status(400).json({ message: "Invalid vehicle type" });
    }

    const fare =
      pricing.basePrice +
      pricing.perKm * distance +
      pricing.perMinute * duration;

    res.json({
      vehicleType,
      estimatedFare: Math.round(fare),
      breakdown: {
        basePrice: pricing.basePrice,
        distanceCharge: pricing.perKm * distance,
        timeCharge: pricing.perMinute * duration,
      },
    });
  } catch (error) {
    console.error("Error calculating fare:", error);
    res.status(500).json({ message: "Error calculating fare" });
  }
});

module.exports = router;
