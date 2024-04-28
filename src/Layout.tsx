// import "../Styles/Custom.css";

import { Layout, Space } from "antd";
import { Navigate, useOutlet } from "react-router";
//import { Roles } from "../../Utils/Roles";
import React from "react";
import Headerbar from "./Headerbar";
import Sidebar from "./Sidebar";
const { Header, Sider, Content } = Layout;

// const headerStyle: React.CSSProperties = {
//   textAlign: "center",
//   color: "#fff",
//   height: 80,
//   paddingInline: 0,
//   lineHeight: "100px",
//   backgroundColor: "#e7ecf0",
// };

// const contentStyle: React.CSSProperties = {
//   minHeight: 120,
//   lineHeight: "120px",
//   color: "#000000",
//   backgroundColor: "white",
//   borderRadius: "30px 0px 0px",
//   paddingTop: "20px",
//   marginTop: "20px",
//   overflowY: "auto",
//   maxHeight: "90vh",
//   overflowX: "hidden",
// };

// const siderStyle: React.CSSProperties = {
//   textAlign: "center",
//   lineHeight: "50px",
//   width: "300px",
//   color: "#fff",
//   backgroundColor: "#e7ecf0",
//   border: "none",
// };

const contentStyle: React.CSSProperties = {
  textAlign: 'center',
  minHeight: 120,
  marginTop: 90,
  marginLeft: 200,
  //lineHeight: '120px',
  //height: `calc(100vh - ${90}px)`, // Subtracting marginTop from viewport height
  height:`calc(100vh - 90px)`,
  color: 'black',
  backgroundColor: '#fff',
  borderTopLeftRadius: '20px',
  overflowY: 'auto',
};


const siderStyle: React.CSSProperties = {
    width:'100px',
    marginTop:'5px',
    position:'fixed',
    textAlign: 'center',
    lineHeight: '70px',
    color: 'black',
    height:'100vh',
    backgroundColor: '#E7ECF0',
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
          {/* <Header style={headerStyle}>
            <Headerbar />
          </Header> */}
          <Content style={contentStyle}>{outlet}</Content>
        </Layout>
      </Layout>
    </Space>
  );
};
