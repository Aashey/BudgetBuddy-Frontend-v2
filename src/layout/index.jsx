import { Layout } from "antd";
import CustomSider from "../components/sider";
import { Outlet } from "react-router-dom";
import Header from "../components/header";
import { useSelector } from "react-redux";
// import Breadcrumb from "../components/breadcrumb";

const CustomLayout = () => {
  const { mode } = useSelector((state) => state.theme);
  const { Content } = Layout;
  return (
    <>
      <Layout
        style={{
          minHeight: "100vh",
        }}
      >
        <CustomSider />
        <Layout>
          <Header />
          <Layout>
            <Content>
              <div
                style={{
                  backgroundColor: `${
                    mode === "light" ? "#f7f8fa" : "#181925"
                  }`,
                }}
                className="m-auto w-full h-full px-6"
              >
                <Outlet />
              </div>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </>
  );
};

export default CustomLayout;
