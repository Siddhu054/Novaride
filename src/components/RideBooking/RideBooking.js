import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Map from "./Map";
import SearchBox from "./SearchBox";
import { useRide } from "../../context/RideContext";

const RideBookingContainer = styled.div`
  display: flex;
  height: calc(100vh - 64px);
  position: relative;
`;

const MapContainer = styled.div`
  flex: 1;
  height: 100%;
`;

const BookingPanel = styled.div`
  width: 400px;
  height: 100%;
  background: white;
  padding: 2rem;
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
  z-index: 2;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Button = styled.button`
  width: 100%;
  padding: 1rem;
  background-color: ${(props) => (props.disabled ? "#ccc" : "#000")};
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};

  &:hover {
    background-color: ${(props) => (props.disabled ? "#ccc" : "#333")};
  }
`;

const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  z-index: 1000;
`;

function RideBooking() {
  const navigate = useNavigate();
  const [bookingData, setBookingData] = useState({
    pickup: "",
    destination: "",
  });
  const [isMatching, setIsMatching] = useState(false);
  const { requestRide, loading: rideLoading } = useRide();
  const [pickupCoords, setPickupCoords] = useState(null);
  const [destinationCoords, setDestinationCoords] = useState(null);

  const handleBookRide = async () => {
    if (!bookingData.pickup || !bookingData.destination) {
      alert("Please enter pickup and destination locations");
      return;
    }

    setIsMatching(true);
    try {
      const success = await requestRide({
        pickup: bookingData.pickup,
        destination: bookingData.destination,
        pickupCoords,
        destinationCoords,
        status: "pending",
        paymentMethod: "cash",
        paymentStatus: "pending",
        price: Math.floor(Math.random() * 300) + 100,
      });

      if (success) {
        setTimeout(() => {
          setIsMatching(false);
          navigate("/tracking");
        }, 2000);
      } else {
        setIsMatching(false);
        alert("Failed to book ride. Please try again.");
      }
    } catch (error) {
      console.error("Error booking ride:", error);
      setIsMatching(false);
      alert("Error booking ride. Please try again.");
    }
  };

  const handlePickupSelect = (coords) => {
    setPickupCoords(coords);
    setBookingData((prev) => ({
      ...prev,
      pickup: `${coords[0].toFixed(4)}, ${coords[1].toFixed(4)}`,
    }));
  };

  const handleDestinationSelect = (coords) => {
    setDestinationCoords(coords);
    setBookingData((prev) => ({
      ...prev,
      destination: `${coords[0].toFixed(4)}, ${coords[1].toFixed(4)}`,
    }));
  };

  const handlePickupChange = (value) => {
    setBookingData((prev) => ({
      ...prev,
      pickup: value,
    }));
  };

  const handleDestinationChange = (value) => {
    setBookingData((prev) => ({
      ...prev,
      destination: value,
    }));
  };

  return (
    <RideBookingContainer>
      <MapContainer>
        <Map
          pickup={pickupCoords}
          destination={destinationCoords}
          onPickupSelect={handlePickupSelect}
          onDestinationSelect={handleDestinationSelect}
        />
      </MapContainer>
      <BookingPanel>
        <h2>Book a Ride</h2>
        <Form onSubmit={(e) => e.preventDefault()}>
          <SearchBox
            placeholder="Enter pickup location"
            value={bookingData.pickup}
            onChange={handlePickupChange}
          />
          <SearchBox
            placeholder="Enter destination"
            value={bookingData.destination}
            onChange={handleDestinationChange}
          />
          <Button
            type="button"
            disabled={
              !bookingData.pickup || !bookingData.destination || rideLoading
            }
            onClick={handleBookRide}
          >
            {rideLoading ? "Booking..." : "Book Ride"}
          </Button>
        </Form>
      </BookingPanel>
      {(isMatching || rideLoading) && (
        <LoadingOverlay>
          <h2>Finding your driver...</h2>
          <p>This usually takes 1-3 minutes</p>
        </LoadingOverlay>
      )}
    </RideBookingContainer>
  );
}

export default RideBooking;
