import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { RideProvider } from "./context/RideContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <RideProvider>
          <App />
        </RideProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
