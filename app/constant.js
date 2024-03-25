var development = true;
export const BASE_URL = development
  ? "http://192.168.110.244/api"
  : "https://himyanmar.online/api";
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
  VISITOR_REPORT: `${APP_API_URL}/_`,
  LINK: `${APP_API_URL}/link`,
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
  VISITOR: `${admin_route}/visitor`,
  LINK: `${admin_route}/link`,
  TARGET: `${admin_route}/target`,
  VISITOR_MAP: `${admin_route}/visitorMap`,
  SCAN_WP: (url) => `${admin_route}/console/?wpUrl=${url}`,
  CHANNEL_ID: (id) => `/${id}`,
  SEARCH_IN_CHANNEL: (channelId, word) => `/${channelId}/?search=${word}`,
  POST_DETAIL: (channelId, id) => `/${channelId}/${id}`,
};
