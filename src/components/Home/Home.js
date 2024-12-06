import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const HomeContainer = styled.div`
  height: calc(100vh - 64px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
    url("https://images.unsplash.com/photo-1565531152238-5f20a0f4a3f0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")
      center/cover;
  color: white;
  text-align: center;
  padding: 0 20px;
`;

const Title = styled.h1`
  font-size: 4rem;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.8rem;
  margin-bottom: 2rem;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  max-width: 600px;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const BookButton = styled(Link)`
  padding: 1.2rem 3rem;
  background-color: #000;
  color: white;
  text-decoration: none;
  border-radius: 50px;
  font-size: 1.2rem;
  transition: all 0.3s ease;
  border: 2px solid transparent;

  &:hover {
    background-color: transparent;
    border: 2px solid white;
    transform: translateY(-2px);
  }
`;

const Features = styled.div`
  display: flex;
  gap: 2rem;
  margin-top: 3rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const Feature = styled.div`
  text-align: center;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  backdrop-filter: blur(5px);

  h3 {
    margin-bottom: 0.5rem;
  }

  p {
    font-size: 0.9rem;
    opacity: 0.9;
  }
`;

function Home() {
  return (
    <HomeContainer>
      <Title>Welcome to NovaRide</Title>
      <Subtitle>Your Premium Ride-Sharing Experience</Subtitle>
      <BookButton to="/book-ride">Book a Ride Now</BookButton>

      <Features>
        <Feature>
          <h3>Safe Rides</h3>
          <p>Verified drivers and real-time tracking</p>
        </Feature>
        <Feature>
          <h3>Best Prices</h3>
          <p>Competitive rates and no hidden fees</p>
        </Feature>
        <Feature>
          <h3>24/7 Support</h3>
          <p>Always here when you need us</p>
        </Feature>
      </Features>
    </HomeContainer>
  );
}

export default Home;
