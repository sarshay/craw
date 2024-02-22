import React, { useEffect, useMemo, useState } from "react";
import SignIn from "./pages/signin";
import MyRouter from "./routes";
import "./index.css";
import { CookiesProvider, useCookies } from "react-cookie";
// import Tast from "./pages/tast";
import { theme, App as Ant } from "antd";
import { ThemeProvider } from "./providers/context";

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
          <MyRouter />
        </Ant>
      </ThemeProvider>
    </CookiesProvider>
  );
}
export default App;
