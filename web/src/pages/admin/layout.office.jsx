import React, { createContext, useContext, useEffect, useState } from "react";
import { Breadcrumb, Button, FloatButton, Layout, Menu, message, theme } from "antd";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { useApi } from "../../hooks/api";
import DefaultPage from "../default";

import { Outlet } from "react-router-dom";
import { RepoProvider, useTheme } from "../../providers/context";
import { useUser } from "../../hooks/auth/user";
import { adminPagesList } from "../../routes";
import { MoonFilled } from "@ant-design/icons";

const { Header, Content, Footer, Sider } = Layout;


const OfficeLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [page, setPage] = useState(null)
  const { isDark, setIsDark } = useTheme()
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
    <RepoProvider user={user}>
      <LayoutProvider>
        <Layout>
          <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}
          >

            <div className="sticky top-0">
              <div className="p-2">
              <Link to={'/'}>Home</Link>
              </div>
              <Menu
                theme="dark"
                defaultSelectedKeys={adminPagesList?.[0]?.key}
                mode="inline"
                onSelect={e => setPage(adminPagesList.find(x => x.key == e.key))}
                items={adminPagesList.filter(p => !p.hide)}
              />
            </div>
          </Sider>
          <Layout>
            {/* <Header style={{ padding: "0px 16px", background: colorBgContainer }}>
              Header
            </Header> */}
            <Content className="min-h-screen">
              {/* <Breadcrumb style={{ margin: "16px 0" }}>
                <Breadcrumb.Item>User</Breadcrumb.Item>
                <Breadcrumb.Item>Bill</Breadcrumb.Item>
              </Breadcrumb> */}
              <Outlet />
            </Content>
            {/* <Footer style={{ textAlign: "center" }}>
              WP hub ©{new Date().getFullYear()} Created by heinsoe.com
            </Footer> */}
          </Layout>
        </Layout>
      </LayoutProvider>

      <FloatButton onClick={() => setIsDark(!isDark)} icon={<MoonFilled />} />
    </RepoProvider>
  );
};

export default OfficeLayout;




const LayoutContext = createContext();
const LayoutProvider = ({ children }) => {
  const [messageAPi, contextHolder] = message.useMessage();

  const contextValue = {
    messageAPi,
  };

  return (
    <LayoutContext.Provider value={contextValue}>
      {contextHolder}
      {children}
    </LayoutContext.Provider>
  );
};

export const useAdminLayout = () => useContext(LayoutContext);