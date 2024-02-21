import * as React from "react";
import { useUser } from "../hooks/auth/user";
import { pagesList } from "../routes";
import Layout from "../views/layout";
import { Route, Routes } from "react-router-dom";
import AppDashboard from "../views/pages/dashboard";
import {
  ComponentStateProvider,
  MyProvider,
  SocketProvider,
  useMyList,
} from "./context";
import PageNotFound from "../views/pages/PageNotFound";
import FullCenter from "../views/layout/fullCenter";
import { localize } from "../locales";
import ByineShay from "../views/pages/byineShay";
export default function MyRouter(props) {
  const { user, authenticated } = useUser();
  if (!user || !authenticated) {
    return <FullCenter>checking user</FullCenter>;
  } else {
    return (
      <MyProvider user={user}>
        <SocketProvider>
          <Layout {...props}>
            <TheRouter />
          </Layout>
        </SocketProvider>
      </MyProvider>
    );
  }
}
function TheRouter() {
  const { userMenu } = useMyList();
  // console.log(userMenu);
  return (
    <Routes>
      {Object.keys(userMenu).map((key) =>
        //key is for row
        userMenu[key].map((menu) => {
          if (menu.children) {
            return menu.children.map((m) => {
              var element = pagesList()[menu.key][m.key] ? (
                pagesList()[menu.key][m.key].element
              ) : (
                <PageNotFound />
              );
              // console.log(menu.key, m.key);
              // console.log(element);
              return (
                <Route
                  key={m.id}
                  path={`${menu.key}/${m.route ? m.route : m.key}`}
                  element={element}
                />
              );
            });
          } else {
            var element = pagesList()[menu.key] ? (
              pagesList()[menu.key].element
            ) : (
              <PageNotFound />
            );
            return (
              <Route
                key={menu.id}
                path={menu.route ? menu.route : menu.key}
                element={element}
              />
            );
          }
        })
      )}
      <Route path="about" element={<ByineShay />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}
