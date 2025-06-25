import { StrictMode, useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard/Dashboard";
import Header from "./Header/Header";
import Homepage from "./Homepage/Homepage";
import Management from "./ManagementPage/ManagementPage";
import ACWRPage from "./ACWRPage/ACWRPage";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";

import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider, useMsal } from "@azure/msal-react";
import { msalConfig } from "./Authtentification/authConfig";

import api from "./Helpers/ApiClient";

const msalInstance = new PublicClientApplication(msalConfig);

function AppRoutes() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { accounts, instance } = useMsal();

  useEffect(() => {
    if (accounts.length > 0) {
      instance
        .acquireTokenSilent({
          account: accounts[0],
          scopes: ["api://8d32374c-18a3-4253-aed6-9f42d981a68c/access_as_user"],
        })
        .then((response) => {
          api.setToken(response.accessToken);
          setIsLoggedIn(true);
        })
        .catch(() => {
          api.setToken(null);
          setIsLoggedIn(false);
        });
    } else {
      api.setToken(null);
      setIsLoggedIn(false);
    }
  }, [accounts, instance]);

  return (
    <Routes>
      <Route path="*" element={<Homepage />} />
      {isLoggedIn && (
        <>
          <Route path="/welness" element={<Dashboard type={"welness"} />} />
          <Route path="/rpe" element={<Dashboard type={"rpe"} />} />
          <Route path="/management" element={<Management />} />
          <Route path="/acwr" element={<ACWRPage type={"acwr"} />} />
        </>
      )}
    </Routes>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MsalProvider instance={msalInstance}>
      <BrowserRouter>
        <Header />
        <AppRoutes />
      </BrowserRouter>
      <ToastContainer />
    </MsalProvider>
  </StrictMode>
);
