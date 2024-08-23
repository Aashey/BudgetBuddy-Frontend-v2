import { Button, Checkbox, Dropdown, Menu } from "antd";
import { TbColumnsOff } from "react-icons/tb";

const ColumnMenu = ({ columnOptions, handleMenuClick, checkedList }) => {
  const menu = (
    <Menu>
      {columnOptions.map(({ label, value }) => (
        <Menu.Item key={value} onClick={handleMenuClick}>
          <Checkbox checked={checkedList.includes(value)}>{label}</Checkbox>
        </Menu.Item>
      ))}
    </Menu>
  );
  return (
    <div>
      <Dropdown overlay={menu} trigger={["click"]}>
        <Button icon={<TbColumnsOff size={18} />}>Columns</Button>
      </Dropdown>
    </div>
  );
};

export default ColumnMenu;
