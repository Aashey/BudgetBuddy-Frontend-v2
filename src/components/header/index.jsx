import { Avatar, Dropdown, Menu } from "antd";
import Title from "antd/es/typography/Title";
import ThemeToggler from "../theme-toggler";
import Logout from "../logout/logout";
import { useSelector } from "react-redux";
import { FaUserCircle } from "react-icons/fa";
import { NavLink } from "react-router-dom";
// import { IoEyeSharp } from "react-icons/io5";
// import { FaEdit, FaUser } from "react-icons/fa";
// import { CiLogout } from "react-icons/ci";

const Header = () => {
  const { mode } = useSelector((state) => state.theme);
  return (
    <>
      <div
        style={{
          backgroundColor: `${mode === "light" ? "#f7f8fa" : "#181925"}`,
          position: "sticky",
          top: 0,
          zIndex: 10,
        }}
        className="flex px-6 py-2"
      >
        <div className=" flex-1">
          <Title className="text-primary" level={3}>
            Budget Buddy
          </Title>
        </div>
        <div className=" flex-1 ">
          <span className="flex justify-end items-center mr-4">
            <ThemeToggler />
            <Dropdown
              className="ml-2"
              overlay={
                <>
                  <Menu theme="light" style={{ width: "170px" }}>
                    <Menu.Item key="view">
                      <NavLink to="/profile">View Profile</NavLink>
                    </Menu.Item>

                    <Menu.Item key={"password"}>Change Password</Menu.Item>

                    <Menu.Item key={"/logout"}>
                      <Logout />
                    </Menu.Item>
                  </Menu>
                </>
              }
              trigger={["click"]}
            >
              <Avatar
                className=" bg-slate-600 size-8 cursor-pointer"
                icon={<FaUserCircle size={18} />}
              />
            </Dropdown>
          </span>
          <span className="ml-2 mr-2"></span>
        </div>
      </div>
    </>
  );
};

export default Header;
