import React, { useEffect, useState } from "react";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { Outlet } from "react-router-dom";
import { LayoutProvider, RepoProvider } from "../providers/context";

const { Header, Content, Footer, Sider } = Layout;


const PageLayout = () => {
    return (
        <RepoProvider>
            <LayoutProvider>
                <Outlet />
            </LayoutProvider>
        </RepoProvider>
    );
};

export default PageLayout;
