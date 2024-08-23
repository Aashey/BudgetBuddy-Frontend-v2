import { Layout, Menu } from "antd";
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { HiMiniChartPie } from "react-icons/hi2";
import { MdOutlineAttachMoney } from "react-icons/md";

import { TbCategoryPlus, TbReportMoney } from "react-icons/tb";

const CustomSider = () => {
  const { Sider } = Layout;
  const location = useLocation();

  const items = [
    {
      key: "/dashboard",
      label: <NavLink to="/dashboard">Dashboard</NavLink>,
      icon: <HiMiniChartPie size={20} />,
    },
    {
      key: "/category",
      label: "Category",
      icon: <TbCategoryPlus size={20} />,
      children: [
        {
          key: "/category/income-category",
          label: (
            <NavLink to="/category/income-category">Income Category</NavLink>
          ),
        },
        {
          key: "/category/expense-category",
          label: (
            <NavLink to="/category/expense-category">Expense Category</NavLink>
          ),
        },
      ],
    },
    {
      key: "/transaction",
      label: "Transaction",
      icon: <MdOutlineAttachMoney size={20} />,
      children: [
        {
          key: "/transaction",
          label: <NavLink to="/transaction">Transaction</NavLink>,
        },
        {
          key: "/transaction/income",
          label: <NavLink to="/transaction/income">Income</NavLink>,
        },
        {
          key: "/transaction/expense",
          label: <NavLink to="/transaction/expense">Expense</NavLink>,
        },
        {
          key: "/transaction/saving",
          label: <NavLink to="/transaction/saving">Saving</NavLink>,
        },
        {
          key: "/transaction/withdraw",
          label: <NavLink to="/transaction/withdraw">Withdraw</NavLink>,
        },
      ],
    },
    {
      key: "/reports",
      label: "Reports",
      icon: <TbReportMoney size={20} />,
      children: [
        {
          key: "/report/income-report",
          label: <NavLink to="/report/income-report">Income Report</NavLink>,
        },
        {
          key: "/report/expense-report",
          label: <NavLink to="/report/expense-report">Expense Report</NavLink>,
        },
      ],
    },
  ];
  const [collapsed, setCollapsed] = useState(true);
  return (
    <>
      <Sider
        style={{
          overflow: "auto",
          height: "100vh",
          position: "sticky",
          top: 0,
          left: 0,
        }}
        theme="light"
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />

        <Menu
          style={{
            border: "none",
          }}
          theme="light"
          selectedKeys={[location.pathname]}
          mode="inline"
          items={items}
        />
      </Sider>
    </>
  );
};

export default CustomSider;
