import React, { useState } from "react";
import styled from "styled-components";

const PaymentContainer = styled.div`
  padding: 2rem;
  max-width: 500px;
  margin: 0 auto;
`;

const PaymentForm = styled.form`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  margin-bottom: 1.5rem;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  margin: 0.5rem 0;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
`;

const Button = styled.button`
  width: 100%;
  padding: 1rem;
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

const PaymentMethod = styled.div`
  margin: 1rem 0;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #f5f5f5;
  }
`;

function Payment() {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardDetails, setCardDetails] = useState({
    number: "",
    expiry: "",
    cvv: "",
    name: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Payment processed:", { paymentMethod, cardDetails });
  };

  const handleChange = (e) => {
    setCardDetails({
      ...cardDetails,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <PaymentContainer>
      <PaymentForm onSubmit={handleSubmit}>
        <Title>Payment Method</Title>

        <PaymentMethod onClick={() => setPaymentMethod("card")}>
          <input
            type="radio"
            checked={paymentMethod === "card"}
            onChange={() => setPaymentMethod("card")}
          />
          <span> Credit/Debit Card</span>
        </PaymentMethod>

        <PaymentMethod onClick={() => setPaymentMethod("cash")}>
          <input
            type="radio"
            checked={paymentMethod === "cash"}
            onChange={() => setPaymentMethod("cash")}
          />
          <span> Cash</span>
        </PaymentMethod>

        {paymentMethod === "card" && (
          <>
            <Input
              type="text"
              name="number"
              placeholder="Card Number"
              value={cardDetails.number}
              onChange={handleChange}
            />
            <Input
              type="text"
              name="expiry"
              placeholder="MM/YY"
              value={cardDetails.expiry}
              onChange={handleChange}
            />
            <Input
              type="text"
              name="cvv"
              placeholder="CVV"
              value={cardDetails.cvv}
              onChange={handleChange}
            />
            <Input
              type="text"
              name="name"
              placeholder="Name on Card"
              value={cardDetails.name}
              onChange={handleChange}
            />
          </>
        )}

        <Button type="submit">
          {paymentMethod === "card" ? "Add Card" : "Continue with Cash"}
        </Button>
      </PaymentForm>
    </PaymentContainer>
  );
}

export default Payment;
