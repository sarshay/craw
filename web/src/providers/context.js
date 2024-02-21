// MyContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
import { useApi } from "../hooks/api";
import { API_ROUTES, APP_API_URL, APP_WS_URL } from "../routes";

import {
  Typography,
  ConfigProvider,
  theme,
  Slider,
  notification,
  message,
  Spin,
} from "antd";
// import connectSocket from "../socket";
import { getTokenFromLocalStorage } from "../hooks/auth/auth";
import { makeFresh } from "../utils/function";

const MyContext = createContext();

export const MyProvider = ({ children, user }) => {
  const {
    loading: category_loading,
    error: category_err,
    data: category,
    setData: setCategory,
  } = useApi(API_ROUTES.CATEGORY);
  const {
    loading: website_loading,
    error: website_err,
    data: website,
    setData: setWebsite,
  } = useApi(API_ROUTES.WEBSITE);
  if (category_loading || website_loading) {
    return (
      <center>
        welcome
        <br />
        <center>
          <Spin />
        </center>
        <br />
        <Typography type="small">loading..</Typography>
      </center>
    );
  } else {
    return (
      <MyContext.Provider
        value={{
          category,
          category_loading,
          setCategory,
          website,
          website_loading,
          setWebsite,
        }}
      >
        {children}
      </MyContext.Provider>
    );
  }
};

export const useMyList = () => useContext(MyContext);

const UsefulComponentContext = createContext(); // Rename the context variable

export const ComponentStateProvider = ({ children }) => {
  const [theDrawer, setTheDrawer] = useState(null);
  const [popUp, setPopUp] = useState(false);
  const [popUpCloseable, setPopUpCloseable] = useState(true);
  const [messageAPi, contextHolder] = message.useMessage();
  const [noti, contexHolder] = notification.useNotification();

  const [movileNavHeight, setMovileNavHeight] = useState("0px");

  const contextValue = {
    popUp,
    setPopUp,
    setPopUpCloseable,
    movileNavHeight,
    theDrawer,
    setTheDrawer,
    noti,
    messageAPi,
  };

  return (
    <UsefulComponentContext.Provider value={contextValue}>
      {contexHolder}
      {contextHolder}
      {children}
      {popUp && (
        <div
          style={{
            backdropFilter: "blur(1rem)",
            position: "fixed",
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
            zIndex: 10,
          }}
        >
          <div
            style={{ position: "absolute", width: "100%", height: "100%" }}
            onClick={() => setPopUp(false)}
          />
          <center>{popUp}</center>
        </div>
      )}
    </UsefulComponentContext.Provider>
  );
};

export const useComponentState = () => useContext(UsefulComponentContext);

const ThemeContext = createContext(); // Rename the context variable
export const ThemeProvider = ({ children }) => {
  const [themeMode, setThemeMode] = useState(localStorage.getItem("themeMode"));
  var isDark = themeMode == "dark";
  useEffect(() => {
    localStorage.setItem("themeMode", themeMode);
  }, [themeMode]);
  const hue = 300;
  // const hue = 180;
  // const hue = 210;
  // const hue = 235;
  // const [hue, setHue]=useState(180)
  const different = 10;
  const antTheme = {
    token: {
      colorPrimary: `hsl(${hue}, ${isDark ? "50%,60%" : "80%,40%"})`,
      // // borderRadius: borderRadius,
      fontFamily: "pyidaungsu",
      colorText: `hsl(${hue}, ${isDark ? "10%,85%" : "0%,0%"})`,
      colorPrimaryBg: `hsl(${hue}, ${isDark ? "35%,15%" : "70%,95%"})`,
      secondColor: `hsl(${hue + different}, ${isDark ? "50%,75%" : "50%,20%"})`,
      colorLink: `hsl(${hue}, ${isDark ? "90%,60%" : "80%,50%"})`,
      colorBgContainer: `hsl(${hue + different}, ${
        isDark ? "10%,12%" : "10%,100%"
      })`,
      glassBg: `hsla(${hue}, ${isDark ? "12%,16%" : "10%,100%"}, 80%)`,
      bodyBgColor: `hsl(${hue}, ${isDark ? "12%,10%" : "70%,85%"})`,
    },
    // components: {
    //   Layout: {
    //     colorBgHeader: "black",
    //     colorBgBody: "skyblue",
    //   },
    // },
    algorithm: [
      isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
      // theme.compactAlgorithm,
    ],
  };
  return (
    <ThemeContext.Provider value={{ setThemeMode, themeMode }}>
      {/* <Slider defaultValue={hue} onChange={(v)=>setHue(v)} max={360}/> */}
      <ConfigProvider theme={antTheme}>{children}</ConfigProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
