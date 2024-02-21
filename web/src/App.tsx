import React, { useEffect, useMemo, useState } from "react";
import SignIn from "./pages/signin";
import { APP_ROUTES } from "./routes";
import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";

import { CookiesProvider, useCookies } from "react-cookie";
// import Tast from "./pages/tast";
import { theme, App as Ant } from "antd";
import {
  ComponentStateProvider,
  MyProvider,
  ThemeProvider,
} from "./providers/context";
import Office from "./pages/office";
import { useUser } from "./hooks/auth/user";

function MyOffice() {
  const { user, authenticated } = useUser();

  if (!user || !authenticated) {
    return <>checking user</>;
  } else {
    return (
      <MyProvider user={user}>
        <Office />
      </MyProvider>
    );
  }
}

function App() {
  const { useToken } = theme;
  const { token } = useToken();
  useEffect(() => {
    // document.body.style.background = token.bodyBgColor;
    console.log({ token });
  }, [token]);

  return (
    <CookiesProvider>
      <ThemeProvider>
        <Ant>
          <ComponentStateProvider>
            {/* <CssBaseline /> */}
            <HashRouter>
              <Routes>
                <Route path="/*" element={<MyOffice />} />
                <Route path={APP_ROUTES.SIGN_IN} element={<SignIn />} />
                {/* <Route path={"/tast"} element={<Tast />} /> */}
              </Routes>
            </HashRouter>
          </ComponentStateProvider>
        </Ant>
      </ThemeProvider>
    </CookiesProvider>
  );
}
export default App;
