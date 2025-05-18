import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard/Dashboard";
import Header from "./Header/Header";
import Homepage from "./Homepage/Homepage";
import Management from "./ManagementPage/ManagementPage";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/welness" element={<Dashboard type={"welness"} />} />
        <Route path="/rpe" element={<Dashboard type={"rpe"} />} />
        <Route path="/management" element={<Management />} />
        <Route path="*" element={<Homepage />} />
      </Routes>
    </BrowserRouter>
    <ToastContainer />
  </StrictMode>
);
