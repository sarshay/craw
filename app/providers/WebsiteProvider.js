import React, { createContext, useState } from "react";
import { useApi } from "../hooks/api";
import { API_ROUTES } from "../routes";

const WebsiteContext = createContext();

export const WebsiteProvider = ({ children }) => {
  const {
    data: websites,
    loading: websitesLoading,
    refresh,
  } = useApi({
    // url: "https://api.heinsoe.com",
    url: API_ROUTES.WEBSITE,
    cacheKey: "websites",
  });

  return (
    <WebsiteContext.Provider value={{ websites, websitesLoading }}>
      {children}
    </WebsiteContext.Provider>
  );
};

export default WebsiteContext;

