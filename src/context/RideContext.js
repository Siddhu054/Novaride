import React, { createContext, useState, useContext } from "react";
import axios from "axios";

export const RideContext = createContext();

const MOCK_DRIVERS = [
  {
    id: 1,
    name: "Michael Smith",
    rating: 4.8,
    vehicle: {
      model: "Toyota Camry",
      plate: "KA 01 AB 1234",
      color: "White",
    },
    photo: "https://randomuser.me/api/portraits/men/1.jpg",
    phone: "+91 98765 43210",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    rating: 4.9,
    vehicle: {
      model: "Honda City",
      plate: "KA 02 CD 5678",
      color: "Silver",
    },
    photo: "https://randomuser.me/api/portraits/women/1.jpg",
    phone: "+91 98765 43211",
  },
  {
    id: 3,
    name: "David Wilson",
    rating: 4.7,
    vehicle: {
      model: "Hyundai Verna",
      plate: "KA 03 EF 9012",
      color: "Black",
    },
    photo: "https://randomuser.me/api/portraits/men/2.jpg",
    phone: "+91 98765 43212",
  },
];

export const RideProvider = ({ children }) => {
  const [currentRide, setCurrentRide] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const requestRide = async (rideData) => {
    setLoading(true);
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Randomly select a driver
      const randomDriver =
        MOCK_DRIVERS[Math.floor(Math.random() * MOCK_DRIVERS.length)];

      // Create a mock ride with the random driver
      const ride = {
        id: Math.random().toString(36).substr(2, 9),
        ...rideData,
        driver: randomDriver,
        status: "confirmed",
        createdAt: new Date().toISOString(),
        estimatedArrival: "10-15 mins",
      };

      setCurrentRide(ride);
      return true;
    } catch (error) {
      setError("Failed to request ride");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const cancelRide = async () => {
    setCurrentRide(null);
  };

  return (
    <RideContext.Provider
      value={{
        currentRide,
        loading,
        error,
        requestRide,
        cancelRide,
      }}
    >
      {children}
    </RideContext.Provider>
  );
};

export const useRide = () => {
  const context = useContext(RideContext);
  if (!context) {
    throw new Error("useRide must be used within a RideProvider");
  }
  return context;
};
