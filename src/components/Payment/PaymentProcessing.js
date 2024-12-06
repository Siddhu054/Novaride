import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const PaymentContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
`;

const PaymentContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  width: 90%;
  max-width: 400px;
`;

const PaymentMethod = styled.div`
  margin: 1rem 0;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 1rem;

  &:hover {
    background: #f5f5f5;
  }
`;

const Amount = styled.div`
  font-size: 2rem;
  margin: 1rem 0;
  font-weight: bold;
  text-align: center;
`;

const Button = styled.button`
  width: 100%;
  padding: 1rem;
  background-color: ${(props) => (props.disabled ? "#ccc" : "#000")};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  margin-top: 1rem;

  &:hover {
    background-color: ${(props) => (props.disabled ? "#ccc" : "#333")};
  }
`;

function PaymentProcessing({ amount, onSuccess, onCancel }) {
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [processing, setProcessing] = useState(false);

  const handlePayment = async () => {
    if (!selectedMethod) return;

    setProcessing(true);
    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000));
      onSuccess();
      navigate("/rating");
    } catch (error) {
      console.error("Payment failed:", error);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <PaymentContainer>
      <PaymentContent>
        <h2>Payment</h2>
        <Amount>${amount.toFixed(2)}</Amount>

        <PaymentMethod onClick={() => setSelectedMethod("card")}>
          <input type="radio" checked={selectedMethod === "card"} readOnly />
          <div>
            <h3>Credit Card</h3>
            <p>**** **** **** 1234</p>
          </div>
        </PaymentMethod>

        <PaymentMethod onClick={() => setSelectedMethod("cash")}>
          <input type="radio" checked={selectedMethod === "cash"} readOnly />
          <div>
            <h3>Cash</h3>
            <p>Pay with cash</p>
          </div>
        </PaymentMethod>

        <Button
          onClick={handlePayment}
          disabled={processing || !selectedMethod}
        >
          {processing ? "Processing..." : "Pay Now"}
        </Button>
        <Button onClick={onCancel} style={{ background: "#666" }}>
          Cancel
        </Button>
      </PaymentContent>
    </PaymentContainer>
  );
}

export default PaymentProcessing;
