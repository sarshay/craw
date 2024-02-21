import React, { useEffect, useState } from "react";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useApi } from "../../hooks/api";
import { API_ROUTES, adminPagesList } from "../../routes";
import DefaultPage from "../default";

import { Outlet } from "react-router-dom";
import { MyProvider } from "../../providers/context";
import { useUser } from "../../hooks/auth/user";

const { Header, Content, Footer, Sider } = Layout;


const OfficeLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [page, setPage] = useState(null)

  const { user, authenticated } = useUser();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const navigate = useNavigate();
  useEffect(() => {
    if (page?.path) {
      navigate(page.path)
    }
  }, [page])
  return (
    <MyProvider user={user}>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <div className="demo-logo-vertical" />
          <Menu
            theme="dark"
            defaultSelectedKeys={adminPagesList?.[0]?.key}
            mode="inline"
            onSelect={e => setPage(adminPagesList.find(x => x.key == e.key))}
            items={adminPagesList.filter(p => !p.hide)}
          />
        </Sider>
        <Layout>
          <Header style={{ padding: "0px 16px", background: colorBgContainer }}>
            Header
          </Header>
          <Content style={{ margin: "0 16px" }}>
            <Breadcrumb style={{ margin: "16px 0" }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            <Outlet />
          </Content>
          <Footer style={{ textAlign: "center" }}>
            WP hub ©{new Date().getFullYear()} Created by heinsoe.com
          </Footer>
        </Layout>
      </Layout>
    </MyProvider>
  );
};

export default OfficeLayout;
