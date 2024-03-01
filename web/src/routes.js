import React from "react";
import {
  DesktopOutlined,
  FacebookFilled,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import WebsitePage from "./pages/admin/website";
import CategoryPage from "./pages/admin/category";
import ConsolePage from "./pages/admin/console";
import {
  RouterProvider,
  createBrowserRouter,
  createHashRouter,
} from "react-router-dom";
import SignInPage from "./pages/signin";
import OfficeLayout from "./pages/admin/layout.office";
import HomePage from "./pages/home";
import PageLayout from "./pages/layout";
import ChannelPage from "./pages/channel";
import PostPage from "./pages/post";
import FacebookPage from "./pages/admin/facebook";

var development = false;
export const BASE_URL = development
  ? "http://localhost/api"
  : "/api";
export const APP_API_URL = `${BASE_URL}`;
export const APP_WS_URL = BASE_URL;
export const API_ROUTES = {
  APP_API_URL: APP_API_URL,
  SIGN_IN: `${APP_API_URL}/auth/signin`,
  ME: `${APP_API_URL}/auth/me`,
  WEBSITE: `${APP_API_URL}/website`,
  FB_PAGE: `${APP_API_URL}/fb`,
  CATEGORY: `${APP_API_URL}/category`,
  ERROR_REPORT: `${APP_API_URL}/error`,
};
const admin_route = "/admin";
export const APP_ROUTES = {
  HOME: "/",
  SIGN_IN: "/signin",
  DASHBOARD: `${admin_route}`,
  CATEGORY: `${admin_route}/category`,
  WEBSITE: `${admin_route}/website`,
  CONSOLE: `${admin_route}/console`,
  FACEBOOK: `${admin_route}/fb`,
  SCAN_WP: (url) => `${admin_route}/console/?wpUrl=${url}`,
  CHANNEL_ID: (id) => `/${id}`,
  SEARCH_IN_CHANNEL: (channelId, word) => `/${channelId}/?search=${word}`,
  POST_DETAIL: (channelId, id) => `/${channelId}/${id}`,
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
  {
    key: "facebookPage",
    icon: <FacebookFilled />,
    label: "Facebook Page",
    path: APP_ROUTES.FACEBOOK,
    element: <FacebookPage />,
  },
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
    children: [
      {
        key: "postId",
        path: APP_ROUTES.POST_DETAIL(":channelId", ":postId"),
        element: <PostPage />,
      },
    ],
  },
];
export default function MyRouter() {
  const router = createBrowserRouter([
    {
      path: "/signin",
      element: <SignInPage />,
    },
    {
      path: APP_ROUTES.DASHBOARD,
      element: <OfficeLayout />,
      errorElement: "page not found",
      children: [...adminPagesList],
    },
    {
      path: "/",
      element: <PageLayout />,
      errorElement: "error",
      children: [...pagesList],
    },
  ]);
  return <RouterProvider router={router} />;
}
