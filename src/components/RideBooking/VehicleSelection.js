import React from "react";
import styled from "styled-components";

const VehicleContainer = styled.div`
  margin: 1rem 0;
`;

const VehicleOptions = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
`;

const VehicleCard = styled.div`
  padding: 1rem;
  border: 2px solid ${(props) => (props.selected ? "#000" : "#ddd")};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  background: ${(props) => (props.selected ? "#f8f8f8" : "white")};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`;

const VehicleIcon = styled.div`
  font-size: 2rem;
  margin-bottom: 0.5rem;
`;

const VehicleInfo = styled.div`
  h4 {
    margin: 0;
    text-transform: capitalize;
  }

  p {
    margin: 0.25rem 0 0;
    color: #666;
    font-size: 0.9rem;
  }
`;

const PriceBreakdown = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  background: #f8f8f8;
  border-radius: 8px;

  h4 {
    margin: 0 0 0.5rem;
  }

  p {
    margin: 0.25rem 0;
    display: flex;
    justify-content: space-between;
  }
`;

function VehicleSelection({ vehicles, selectedType, onSelect, fareEstimate }) {
  if (!vehicles || vehicles.length === 0) {
    return <div>Loading vehicle options...</div>;
  }

  return (
    <VehicleContainer>
      <h3>Select Vehicle Type</h3>

      <VehicleOptions>
        {vehicles.map(({ type, name, description, icon, pricing }) => (
          <VehicleCard
            key={type}
            selected={selectedType === type}
            onClick={() => onSelect(type)}
          >
            <VehicleIcon>{icon}</VehicleIcon>
            <VehicleInfo>
              <h4>{name}</h4>
              <p>{description}</p>
              <p>Base fare: ₹{pricing.basePrice}</p>
            </VehicleInfo>
          </VehicleCard>
        ))}
      </VehicleOptions>

      {fareEstimate && (
        <PriceBreakdown>
          <h4>Fare Breakdown</h4>
          <p>
            <span>Base Fare</span>
            <span>₹{fareEstimate.breakdown.basePrice}</span>
          </p>
          <p>
            <span>Distance Charge</span>
            <span>₹{Math.round(fareEstimate.breakdown.distanceCharge)}</span>
          </p>
          <p>
            <span>Time Charge</span>
            <span>₹{Math.round(fareEstimate.breakdown.timeCharge)}</span>
          </p>
          <p style={{ fontWeight: "bold", marginTop: "0.5rem" }}>
            <span>Total Estimate</span>
            <span>₹{fareEstimate.estimatedFare}</span>
          </p>
        </PriceBreakdown>
      )}
    </VehicleContainer>
  );
}

export default VehicleSelection;
