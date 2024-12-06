import React from "react";
import styled from "styled-components";

const ModalOverlay = styled.div`
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

const ModalContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
`;

const EmergencyButton = styled.button`
  width: 100%;
  padding: 1rem;
  margin: 0.5rem 0;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  background-color: ${(props) => props.color || "#000"};
  color: white;

  &:hover {
    opacity: 0.9;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #666;
`;

function EmergencyModal({ onClose }) {
  const handleEmergencyCall = (type) => {
    switch (type) {
      case "police":
        window.location.href = "tel:911";
        break;
      case "support":
        window.location.href = "tel:1234567890";
        break;
      default:
        break;
    }
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <h2>Emergency Contact</h2>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <EmergencyButton
          color="#ff4444"
          onClick={() => handleEmergencyCall("police")}
        >
          Call Police (911)
        </EmergencyButton>
        <EmergencyButton onClick={() => handleEmergencyCall("support")}>
          Call NovaRide Support
        </EmergencyButton>
        <EmergencyButton onClick={onClose}>Cancel</EmergencyButton>
      </ModalContent>
    </ModalOverlay>
  );
}

export default EmergencyModal;
