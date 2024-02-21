import React, { useLayoutEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Link,
  useLocation
} from "react-router-dom";
import conf from './config.json';
export { clearHtml, TheHtml, unescapeHTML } from "./html";

export function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
};
export const myConfig = conf;