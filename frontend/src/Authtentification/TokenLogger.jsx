import { useMsal } from "@azure/msal-react";
import { useEffect } from "react";

export function TokenLogger() {
  const { instance, accounts } = useMsal();

  useEffect(() => {
    if (accounts.length > 0) {
      instance
        .acquireTokenSilent({
          account: accounts[0],
          scopes: ["api://8d32374c-18a3-4253-aed6-9f42d981a68c/access_as_user"],
        })
        .then((response) => {
          console.log("Access Token:", response.accessToken);
        })
        .catch((error) => {
          console.error("Token error:", error);
        });
    }
  }, [accounts, instance]);

  return null;
}
