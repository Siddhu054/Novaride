import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

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
  text-align: center;
`;

const StarContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin: 2rem 0;
  font-size: 2rem;
`;

const Star = styled.span`
  cursor: pointer;
  color: ${(props) => (props.filled ? "#ffd700" : "#ddd")};
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.8rem;
  margin: 1rem 0;
  border: 1px solid #ddd;
  border-radius: 4px;
  min-height: 100px;
`;

const Button = styled.button`
  padding: 1rem 2rem;
  background-color: #000;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 1rem;

  &:hover {
    background-color: #333;
  }
`;

function RatingModal({ driverInfo, onClose, onSubmit }) {
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");

  const handleSubmit = async () => {
    if (rating === 0) return;

    await onSubmit(rating, feedback);
    onClose();
    navigate("/");
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <h2>Rate Your Ride</h2>
        <p>How was your ride with {driverInfo.name}?</p>

        <StarContainer>
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              filled={star <= rating}
              onClick={() => setRating(star)}
            >
              ★
            </Star>
          ))}
        </StarContainer>

        <TextArea
          placeholder="Additional feedback (optional)"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        />

        <Button onClick={handleSubmit}>Submit Rating</Button>
        <Button onClick={onClose} style={{ background: "#666" }}>
          Skip
        </Button>
      </ModalContent>
    </ModalOverlay>
  );
}

export default RatingModal;
