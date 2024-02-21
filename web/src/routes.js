import React from "react";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import WebsitePage from "./pages/website";
import CategoryPage from "./pages/category";
import ConsolePage from "./pages/console";

var development = true;
export const BASE_URL = development
  ? "http://localhost"
  : "https://api.himyanmar.com";
export const APP_API_URL = `${BASE_URL}`;
export const APP_WS_URL = BASE_URL;
export const API_ROUTES = {
  APP_API_URL: APP_API_URL,
  SIGN_IN: `${APP_API_URL}/auth/signin`,
  ME: `${APP_API_URL}/auth/me`,
  WEBSITE: `${APP_API_URL}/website`,
  CATEGORY: `${APP_API_URL}/category`,
};
export const APP_ROUTES = {
  SIGN_IN: "/signin",
  DASHBOARD: "/",
  CATEGORY: "/category",
  WEBSITE: "/website",
  CONSOLE: "/console",
  SCAN_WP: (url) => `/console/?wpUrl=${url}`,
};

export const pagesList = [
  {
    key: "dashboard",
    icon: <DesktopOutlined />,
    label: "dashboard",
    path: APP_ROUTES.DASHBOARD,
    element: "dashboard",
  },
  {
    key: "website",
    icon: null,
    label: "Website",
    path: APP_ROUTES.WEBSITE,
    element: <WebsitePage />,
  },
  {
    key: "category",
    icon: null,
    label: "Category",
    path: APP_ROUTES.CATEGORY,
    element: <CategoryPage />,
  },
  {
    key: "console",
    icon: null,
    label: "Console",
    path: APP_ROUTES.CONSOLE,
    element: <ConsolePage />,
  },
  {
    key: "wpUrl",
    icon: null,
    label: "wpUrl",
    path: `${APP_ROUTES.CONSOLE}/:wpUrl`,
    hide: true,
    element: <ConsolePage />,
  },
];
