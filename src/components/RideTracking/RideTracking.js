import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import io from "socket.io-client";
import EmergencyModal from "./EmergencyModal";
import RatingModal from "./RatingModal";
import ChatBox from "./ChatBox";
import { useNavigate } from "react-router-dom";

const TrackingContainer = styled.div`
  display: flex;
  height: calc(100vh - 64px);
`;

const MapSection = styled.div`
  flex: 1;
  height: 100%;

  .leaflet-container {
    height: 100%;
    width: 100%;
  }
`;

const InfoPanel = styled.div`
  width: 400px;
  background: white;
  padding: 2rem;
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
`;

const DriverInfo = styled.div`
  margin-bottom: 2rem;
`;

const DriverImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-bottom: 1rem;
`;

const RideInfo = styled.div`
  padding: 1rem;
  background: #f5f5f5;
  border-radius: 8px;
  margin-bottom: 1rem;
`;

const Button = styled.button`
  width: 100%;
  padding: 1rem;
  background-color: ${(props) => (props.emergency ? "#ff4444" : "#000")};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 1rem;

  &:hover {
    background-color: ${(props) => (props.emergency ? "#cc0000" : "#333")};
  }
`;

function RideTracking() {
  const navigate = useNavigate();
  const [driverLocation, setDriverLocation] = useState([51.505, -0.09]);
  const [rideStatus, setRideStatus] = useState("Finding your driver");
  const [estimatedTime, setEstimatedTime] = useState("10 mins");
  const [showEmergency, setShowEmergency] = useState(false);
  const [showRating, setShowRating] = useState(false);
  const [socket, setSocket] = useState(null);

  const [driverInfo] = useState({
    name: "Michael Smith",
    rating: 4.8,
    car: "Toyota Camry",
    plate: "ABC 123",
    photo: "https://randomuser.me/api/portraits/men/1.jpg",
  });

  // Initialize socket connection
  useEffect(() => {
    // In production, replace with your actual server URL
    const newSocket = io("http://localhost:6051");
    setSocket(newSocket);

    return () => newSocket.close();
  }, []);

  // Listen for real-time updates
  useEffect(() => {
    if (socket) {
      socket.on("driverLocation", (location) => {
        setDriverLocation(location);
      });

      socket.on("rideStatus", (status) => {
        setRideStatus(status);
      });

      socket.on("estimatedTime", (time) => {
        setEstimatedTime(time);
      });
    }
  }, [socket]);

  // Simulate driver movement
  useEffect(() => {
    const interval = setInterval(() => {
      setDriverLocation((prev) => [
        prev[0] + (Math.random() - 0.5) * 0.001,
        prev[1] + (Math.random() - 0.5) * 0.001,
      ]);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Simulate ride status updates
  useEffect(() => {
    const statuses = [
      "Finding your driver",
      "Driver is on the way",
      "Driver is arriving",
      "You're on your way",
    ];
    let currentIndex = 0;

    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % statuses.length;
      setRideStatus(statuses[currentIndex]);
      setEstimatedTime(Math.max(2, Math.floor(Math.random() * 10)) + " mins");
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleEmergency = () => {
    setShowEmergency(true);
  };

  const handleCancel = () => {
    if (socket) {
      socket.emit("cancelRide");
      navigate("/");
    }
  };

  const completeRide = () => {
    setShowRating(true);
  };

  return (
    <TrackingContainer>
      <MapSection>
        <MapContainer center={driverLocation} zoom={15}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={driverLocation}>
            <Popup>Your driver is here</Popup>
          </Marker>
        </MapContainer>
      </MapSection>

      <InfoPanel>
        <h2>{rideStatus}</h2>
        <p>Estimated time: {estimatedTime}</p>

        <DriverInfo>
          <DriverImage src={driverInfo.photo} alt="Driver" />
          <h3>{driverInfo.name}</h3>
          <p>Rating: {driverInfo.rating} ⭐</p>
          <p>{driverInfo.car}</p>
          <p>Plate: {driverInfo.plate}</p>
        </DriverInfo>

        <RideInfo>
          <p>From: 123 Main St</p>
          <p>To: 456 Park Ave</p>
          <p>Estimated Fare: $25.50</p>
        </RideInfo>

        <Button onClick={handleCancel}>Cancel Ride</Button>
        <Button emergency onClick={handleEmergency}>
          Emergency Contact
        </Button>
        {rideStatus === "You're on your way" && (
          <Button onClick={completeRide}>Complete Ride</Button>
        )}
      </InfoPanel>

      {showEmergency && (
        <EmergencyModal onClose={() => setShowEmergency(false)} />
      )}
      {showRating && (
        <RatingModal
          driverInfo={driverInfo}
          onClose={() => setShowRating(false)}
        />
      )}
      <ChatBox socket={socket} driverInfo={driverInfo} />
    </TrackingContainer>
  );
}

export default RideTracking;
