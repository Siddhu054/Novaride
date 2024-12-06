import React, { useState } from "react";
import styled from "styled-components";
import RideHistory from "./RideHistory";
import Dashboard from "./Dashboard";

const ProfileContainer = styled.div`
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
`;

const ProfileSection = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
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
  padding: 0.8rem 1.5rem;
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

const RideHistoryItem = styled.div`
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 1rem;

  h3 {
    margin: 0 0 0.5rem 0;
    font-size: 1.1rem;
  }

  p {
    margin: 0.2rem 0;
    color: #666;
  }
`;

function Profile() {
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john@example.com",
    phone: "+1234567890",
  });

  const [rideHistory] = useState([
    {
      id: 1,
      date: "2024-03-15",
      from: "123 Main St",
      to: "456 Park Ave",
      price: "$25.50",
      status: "Completed",
    },
    {
      id: 2,
      date: "2024-03-14",
      from: "789 Broadway",
      to: "321 Fifth Ave",
      price: "$18.75",
      status: "Completed",
    },
  ]);

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    console.log("Profile updated:", profile);
  };

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <ProfileContainer>
      <Dashboard />
      <ProfileSection>
        <Title>Profile Information</Title>
        <form onSubmit={handleProfileUpdate}>
          <Input
            type="text"
            name="name"
            placeholder="Full Name"
            value={profile.name}
            onChange={handleChange}
          />
          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={profile.email}
            onChange={handleChange}
          />
          <Input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={profile.phone}
            onChange={handleChange}
          />
          <Button type="submit">Update Profile</Button>
        </form>
      </ProfileSection>

      <RideHistory />
    </ProfileContainer>
  );
}

export default Profile;
