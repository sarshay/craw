// RepoContext.js
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
  Layout,
  App,
} from "antd";
// import connectSocket from "../socket";
import { getTokenFromLocalStorage } from "../hooks/auth/auth";
import { makeFresh } from "../utils/function";
import { Footer, Header } from "antd/es/layout/layout";
import MyPlayer from "../components/player";

const RepoContext = createContext();

export const RepoProvider = ({ children, user }) => {
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

  const {
    loading: tv_loading,
    error: tv_err,
    data: tv,
  } = useApi(API_ROUTES.TV);

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
      <RepoContext.Provider
        value={{
          category,
          category_loading,
          setCategory,
          website,
          website_loading,
          setWebsite,
          tv_loading,
          tv_err,
          tv,
        }}
      >
        {children}
      </RepoContext.Provider>
    );
  }
};

export const useMyList = () => useContext(RepoContext);

const LayoutContext = createContext(); // Rename the context variable

export const LayoutProvider = ({ children }) => {
  const [messageAPi, contextHolder] = message.useMessage();
  const [medias, setMedias] = useState({});
  const [header, setHeader] = useState(null);
  const [header2, setHeader2] = useState(null);

  const contextValue = {
    messageAPi,
    header,
    setHeader,
    header2,
    setHeader2,
    setMedias,
    medias,
  };

  return (
    <LayoutContext.Provider value={contextValue}>
      {contextHolder}
      <MyPlayer medias={medias?.medias} title={medias?.title} />
      <Layout>
        {header}
        {header2}
        {children}
      </Layout>
    </LayoutContext.Provider>
  );
};

export const useLayout = () => useContext(LayoutContext);

const ThemeContext = createContext(); // Rename the context variable
export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    localStorage.setItem("isDark", isDark);
  }, [isDark]);
  const [hue, setHue] = useState(200);
  // const hue = 180;
  // const hue = 210;
  // const hue = 235;
  // const [hue, setHue]=useState(180)
  const different = 10;
  const antTheme = {
    token: {
      colorPrimary: `hsl(${hue}, ${isDark ? "50%,60%" : "80%,40%"})`,
      // // borderRadius: borderRadius,
      fontFamily: "Arial",
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
    <ThemeContext.Provider value={{ setIsDark, isDark, setHue, hue }}>
      {/* <Slider defaultValue={hue} onChange={(v)=>setHue(v)} max={360}/> */}
      <div data-mode={isDark ? "dark" : "light"}>
        <App>
          <ConfigProvider theme={antTheme}>{children}</ConfigProvider>
        </App>
      </div>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
