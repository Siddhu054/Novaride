import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useRide } from "../../hooks/useRide";

const HistoryContainer = styled.div`
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
`;

const RideCard = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
  }
`;

const RideDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
`;

const FilterBar = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const FilterButton = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  background: ${(props) => (props.active ? "#000" : "#f5f5f5")};
  color: ${(props) => (props.active ? "white" : "#333")};
  cursor: pointer;

  &:hover {
    background: ${(props) => (props.active ? "#333" : "#e5e5e5")};
  }
`;

function RideHistory() {
  const { getRideHistory } = useRide();
  const [rides, setRides] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRideHistory();
  }, []);

  const loadRideHistory = async () => {
    try {
      const history = await getRideHistory();
      setRides(history);
    } catch (error) {
      console.error("Error loading ride history:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredRides = rides.filter((ride) => {
    if (filter === "all") return true;
    return ride.status === filter;
  });

  if (loading) return <div>Loading...</div>;

  return (
    <HistoryContainer>
      <h2>Ride History</h2>

      <FilterBar>
        <FilterButton
          active={filter === "all"}
          onClick={() => setFilter("all")}
        >
          All Rides
        </FilterButton>
        <FilterButton
          active={filter === "completed"}
          onClick={() => setFilter("completed")}
        >
          Completed
        </FilterButton>
        <FilterButton
          active={filter === "cancelled"}
          onClick={() => setFilter("cancelled")}
        >
          Cancelled
        </FilterButton>
      </FilterBar>

      {filteredRides.map((ride) => (
        <RideCard key={ride.id}>
          <h3>{new Date(ride.date).toLocaleDateString()}</h3>
          <RideDetails>
            <div>
              <h4>From</h4>
              <p>{ride.from}</p>
            </div>
            <div>
              <h4>To</h4>
              <p>{ride.to}</p>
            </div>
            <div>
              <h4>Price</h4>
              <p>${ride.price.toFixed(2)}</p>
            </div>
            <div>
              <h4>Driver</h4>
              <p>{ride.driver}</p>
            </div>
            {ride.rating && (
              <div>
                <h4>Rating</h4>
                <p>{ride.rating} ⭐</p>
              </div>
            )}
            <div>
              <h4>Status</h4>
              <p
                style={{
                  color: ride.status === "completed" ? "#4caf50" : "#f44336",
                }}
              >
                {ride.status.charAt(0).toUpperCase() + ride.status.slice(1)}
              </p>
            </div>
          </RideDetails>
        </RideCard>
      ))}
    </HistoryContainer>
  );
}

export default RideHistory;
