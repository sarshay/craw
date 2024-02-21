import React, { useEffect, useState } from "react";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { Outlet } from "react-router-dom";
import { MyProvider } from "../providers/context";

const { Header, Content, Footer, Sider } = Layout;


const PageLayout = () => {
    return (
        <MyProvider>
            <Layout style={{ minHeight: "100vh" }}>
                <Content style={{ margin: "0 16px" }}>
                    <Outlet />
                </Content>
                {/* <Footer style={{ textAlign: "center" }}>
                    WP hub ©{new Date().getFullYear()} Created by heinsoe.com
                </Footer> */}
            </Layout>
        </MyProvider>
    );
};

export default PageLayout;
