import { useState, useContext } from "react";
import axios from "axios";

export const useRide = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const requestRide = async (rideData) => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Please login to book a ride");
      }

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/rides`,
        rideData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data) {
        console.log("Ride booked successfully:", response.data);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Booking error:", error);
      setError(error.response?.data?.message || "Failed to request ride");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    requestRide,
    loading,
    error,
  };
};
