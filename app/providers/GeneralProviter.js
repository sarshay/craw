import React, { createContext, useState } from "react";
import { useApi } from "../hooks/api";
import { API_ROUTES } from "../routes";

const GeneralContext = createContext();

export const GeneralProviter = ({ children }) => {
  const {
    data: websites,
    loading: websitesLoading,
    refresh: refreshWebsites,
  } = useApi({
    // url: "https://api.heinsoe.com",
    url: API_ROUTES.WEBSITE,
    cacheKey: "websites",
  });
  const {
    data: category,
    loading: categoryLoading,
    refresh: refreshCategory,
  } = useApi({
    // url: "https://api.heinsoe.com",
    url: API_ROUTES.CATEGORY,
    cacheKey: "category",
  });

  return (
    <GeneralContext.Provider
      value={{
        websites,
        websitesLoading,
        refreshWebsites,
        category,
        categoryLoading,
        refreshCategory,
      }}
    >
      {children}
    </GeneralContext.Provider>
  );
};

export default GeneralContext;
