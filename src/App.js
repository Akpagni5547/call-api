import React, { useState, useEffect } from "react";
import axios from "axios";
import { PieChartOutlined } from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme, Table } from "antd";
const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [getItem("Call API", "1", <PieChartOutlined />)];
const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setErrors] = useState("");

  const columns = [
    {
      title: "Titre",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Description",
      dataIndex: "body",
      key: "description",
    },
  ];

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts"
        );
        setIsLoading(false);
        setData(response.data);
      } catch (e) {
        setIsLoading(false);
        setErrors(e);
      }
    };
    loadData();
  }, []);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div
          style={{
            height: 32,
            margin: 16,
            background: "rgba(255, 255, 255, 0.2)",
          }}
        />
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        />
        <Content
          style={{
            margin: "0 16px",
          }}
        >
          <Breadcrumb
            style={{
              margin: "16px 0",
            }}
          >
            <Breadcrumb.Item>Benin</Breadcrumb.Item>
            <Breadcrumb.Item>Abidjan</Breadcrumb.Item>
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
            }}
          >
            <Table
              dataSource={data}
              loading={isLoading}
              columns={columns}
            />
          </div>
          {error && <p>{error}</p>}
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};
export default App;
