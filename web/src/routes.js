import React from "react";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import WebsitePage from "./pages/admin/website";
import CategoryPage from "./pages/admin/category";
import ConsolePage from "./pages/admin/console";
import {
  Route,
  Router,
  RouterProvider,
  Routes,
  createBrowserRouter,
  createHashRouter,
} from "react-router-dom";
import SignInPage from "./pages/signin";
import { useUser } from "./hooks/auth/user";
import { MyProvider } from "./providers/context";
import OfficeLayout from "./pages/admin/layout.office";
import HomePage from "./pages/home";
import PageLayout from "./pages/layout";
import ChannelPage from "./pages/channel";

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
const admin_route = "/admin";
export const APP_ROUTES = {
  SIGN_IN: "/signin",
  DASHBOARD: `${admin_route}`,
  CATEGORY: `${admin_route}/category`,
  WEBSITE: `${admin_route}/website`,
  CONSOLE: `${admin_route}/console`,
  SCAN_WP: (url) => `${admin_route}/console/?wpUrl=${url}`,
  CHANNEL_ID: (id) => `/${id}`,
};

export const adminPagesList = [
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
  // {
  //   key: "wpUrl",
  //   icon: null,
  //   label: "wpUrl",
  //   path: `${APP_ROUTES.CONSOLE}/:wpUrl`,
  //   hide: true,
  //   element: <ConsolePage />,
  // },
];

export const pagesList = [
  {
    key: "home",
    path: "/",
    element: <HomePage />,
  },
  {
    key: "channelId",
    path: APP_ROUTES.CHANNEL_ID(":channelId"),
    element: <ChannelPage />,
  },
];
export default function MyRouter() {
  const router = createHashRouter([
    {
      path: "/signin",
      element: <SignInPage />,
    },
    {
      path: "/admin",
      element: <OfficeLayout />,
      errorElement: "page not found",
      children: adminPagesList,
    },
    {
      path: "/",
      element: <PageLayout />,
      errorElement: "error",
      children: pagesList,
    },
  ]);
  return <RouterProvider router={router} />;
}
