import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import RideBooking from "./components/RideBooking/RideBooking";
import Login from "./components/Authentication/Login";
import SignUp from "./components/Authentication/SignUp";
import Profile from "./components/Profile/Profile";
import Payment from "./components/Payment/Payment";
import RideTracking from "./components/RideTracking/RideTracking";
import { AuthProvider } from "./context/AuthContext";
import { RideProvider } from "./context/RideContext";

function App() {
  return (
    <AuthProvider>
      <RideProvider>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/book-ride" element={<RideBooking />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/tracking" element={<RideTracking />} />
          </Routes>
        </div>
      </RideProvider>
    </AuthProvider>
  );
}

export default App;
