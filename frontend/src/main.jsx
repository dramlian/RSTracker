import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard/Dashboard";
import Header from "./Header/Header";
import Homepage from "./Homepage/Homepage";
import Management from "./ManagementPage/ManagementPage";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";

import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { msalConfig } from "./Authtentification/authConfig";
import { TokenLogger } from "./Authtentification/TokenLogger";

const msalInstance = new PublicClientApplication(msalConfig);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MsalProvider instance={msalInstance}>
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
      <TokenLogger />
    </MsalProvider>
  </StrictMode>
);
