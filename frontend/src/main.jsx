import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WelnessDashboard from "./WelnessDashboard/WelnessDashboard";
import RPEDashboard from "./RPEDashboard/RPEDashboard";
import Header from "./Header/Header";
import Homepage from "./Homepage/Homepage";
import "bootstrap/dist/css/bootstrap.min.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="*" element={<Homepage />} />
        <Route path="/welness" element={<WelnessDashboard />} />
        <Route path="/rpe" element={<RPEDashboard />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
