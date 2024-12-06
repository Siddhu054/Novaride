import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #000;
  color: white;
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
  text-decoration: none;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  &:hover {
    color: #ddd;
  }
`;

function Navbar() {
  return (
    <Nav>
      <Logo to="/">NovaRide</Logo>
      <NavLinks>
        <NavLink to="/book-ride">Book a Ride</NavLink>
        <NavLink to="/profile">Profile</NavLink>
        <NavLink to="/payment">Payment</NavLink>
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/signup">Sign Up</NavLink>
      </NavLinks>
    </Nav>
  );
}

export default Navbar;
