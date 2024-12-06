import React, { useState, useEffect } from "react";
import styled from "styled-components";

const MatchingContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const MatchingContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  width: 90%;
  max-width: 400px;
  text-align: center;
`;

const LoadingSpinner = styled.div`
  margin: 2rem auto;
  width: 50px;
  height: 50px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #000;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const DriverInfo = styled.div`
  margin-top: 1rem;
  text-align: left;

  img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    margin-right: 1rem;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 1rem;
  background-color: #000;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 1rem;

  &:hover {
    background-color: #333;
  }
`;

function DriverMatching({ onMatch, onCancel }) {
  const [searching, setSearching] = useState(true);
  const [driver, setDriver] = useState(null);
  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    // Simulate driver matching
    const matchTimer = setTimeout(() => {
      setSearching(false);
      setDriver({
        id: 1,
        name: "Michael Smith",
        rating: 4.8,
        car: "Toyota Camry",
        plate: "ABC 123",
        photo: "https://randomuser.me/api/portraits/men/1.jpg",
        eta: "5 mins",
      });
    }, 3000);

    // Countdown timer
    const countdownInterval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          onCancel();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearTimeout(matchTimer);
      clearInterval(countdownInterval);
    };
  }, [onCancel]);

  const handleAccept = () => {
    if (driver) {
      onMatch(driver);
    }
  };

  return (
    <MatchingContainer>
      <MatchingContent>
        {searching ? (
          <>
            <h2>Finding your driver...</h2>
            <p>This usually takes 1-3 minutes</p>
            <LoadingSpinner />
            <p>Time remaining: {timeLeft}s</p>
            <Button onClick={onCancel}>Cancel</Button>
          </>
        ) : (
          <>
            <h2>Driver Found!</h2>
            <DriverInfo>
              <div style={{ display: "flex", alignItems: "center" }}>
                <img src={driver.photo} alt={driver.name} />
                <div>
                  <h3>{driver.name}</h3>
                  <p>{driver.rating} ⭐</p>
                </div>
              </div>
              <p>{driver.car}</p>
              <p>Plate: {driver.plate}</p>
              <p>ETA: {driver.eta}</p>
            </DriverInfo>
            <Button onClick={handleAccept}>Accept Driver</Button>
            <Button onClick={onCancel} style={{ background: "#666" }}>
              Cancel
            </Button>
          </>
        )}
      </MatchingContent>
    </MatchingContainer>
  );
}

export default DriverMatching;
