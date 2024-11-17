"use client";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { App, ConfigProvider, Layout, Switch, theme, ThemeConfig } from "antd";
import { useCookies } from "react-cookie";
import { Loading } from "@/components/Loading";
import Script from "next/script";
interface ThemeContextType {
  isDark: boolean | null;
  setDarkMode: (value: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [cookie, setCookie] = useCookies(["themeMode"]);
  const isDefaultDark = true;
  const [isDark, setIsDark] = useState<boolean | null>(null);

  useEffect(() => {
    if (cookie?.themeMode) {
      setIsDark(cookie.themeMode === "dark");
    } else {
      setIsDark(isDefaultDark);
    }
  }, [cookie.themeMode]);

  const setDarkMode = (value: boolean) => {
    setCookie("themeMode", value ? "dark" : "light", { path: "/" });
  };

  const hue = 266;
  const antTheme: ThemeConfig = {
    token: {
      colorPrimary: `hsl(${hue}, ${isDark ? "50%,60%" : "90%,45%"})`,
    },
    components: {
      Layout: {
        bodyBg: isDark ? `hsl(${hue}, 30%, 10%)` : "#FFF",
      },
    },
    algorithm: [
      isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
      // theme.compactAlgorithm,
    ],
  };
  const updateThemeColor = (color: string) => {
    const metaTag = document.querySelector('meta[name="theme-color"]');
    if (metaTag) {
      metaTag.setAttribute("content", color);
    } else {
      const newMetaTag = document.createElement("meta");
      newMetaTag.name = "theme-color";
      newMetaTag.content = color;
      document.head.appendChild(newMetaTag);
    }
  };
  const { token } = theme.useToken();
  useEffect(() => {
    updateThemeColor(token.colorBgBase);
  }, [isDark]);

  if (isDark == null) {
    return <Loading className="h-screen" />;
  } else {
    return (
      <ThemeContext.Provider value={{ isDark, setDarkMode }}>
        <ConfigProvider theme={antTheme}>
          <div data-mode={isDark ? "dark" : "light"} data-color-mode="dark">
            <Layout>
              <App
                style={{
                  minHeight: "100vh",
                  padding: 0,
                  margin: 0,
                }}
              >
                {children}
              </App>
            </Layout>
          </div>
        </ConfigProvider>
      </ThemeContext.Provider>
    );
  }
};

export const useTheme = () => useContext(ThemeContext);
