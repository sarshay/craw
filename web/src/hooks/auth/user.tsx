import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuthenticatedUser } from "./auth";
import { APP_ROUTES } from "../../routes";
import { useCookies } from "react-cookie";

export function useUser() {
  const [user, setUser] = useState(null);
  const [authenticated, setAutenticated] = useState(false);
  const navigate = useNavigate();

  const [cookies, setCookie] = useCookies(["user_token"]);

  useEffect(() => {
    async function getUserDetails() {
      const { authenticated, user } = await getAuthenticatedUser(
        cookies.user_token
      );
      if (!authenticated) {
        navigate(APP_ROUTES.SIGN_IN);
        return;
      }

      setUser(user);
      setAutenticated(authenticated);
    }
    getUserDetails();
  }, [authenticated, cookies]);

  return { user, authenticated };
}
