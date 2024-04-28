// import "../Styles/Custom.css";

import { Layout, Space } from "antd";
import { Navigate, useOutlet } from "react-router";
//import { Roles } from "../../Utils/Roles";
import React from "react";
import Headerbar from "./Headerbar";
import Sidebar from "./Sidebar";
const { Header, Sider, Content } = Layout;

const contentStyle: React.CSSProperties = {
  textAlign: 'center',
  minHeight: 120,
  marginTop: 90,
  marginLeft: 200,
  lineHeight: '120px',
  //height: `calc(100vh - ${90}px)`, // Subtracting marginTop from viewport height
  height:`calc(100vh - 90px)`,
  color: 'black',
  backgroundColor: '#fff',
  borderTopLeftRadius: '20px',
  overflowY: 'auto',
};


const siderStyle: React.CSSProperties = {
    width:'100px',
    position:'fixed',
    textAlign: 'center',
    lineHeight: '70px',
    color: 'black',
    height:'100vh',
    backgroundColor: '#E4EFE7',
    marginTop:'50px'
};

const headerStyle: React.CSSProperties = {
  color: 'black',
  height: 90,
  backgroundColor: '#E4EFE7',
  position:'fixed',
  right:0,
  left:200,
};
export const DashboardLayout = () => {
  const outlet = useOutlet();
  return (
    <Space direction="vertical" style={{ width: "100%" }} size={[0, 48]}>
      <Layout>
        <Sider style={siderStyle}>
          <Sidebar />
        </Sider>
        <Layout>
          <Header style={headerStyle}>
            <Headerbar />
          </Header>
          <Content style={contentStyle}>{outlet}</Content>
        </Layout>
      </Layout>
    </Space>
  );
};
