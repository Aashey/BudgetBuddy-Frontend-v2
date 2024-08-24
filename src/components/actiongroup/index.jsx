import { Dropdown, Menu, Popconfirm } from "antd";
import { IoEyeSharp } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";

import { AiFillDelete } from "react-icons/ai";
import { HiEllipsisHorizontal } from "react-icons/hi2";
import { formatDate_WithMonth } from "../../utils/helper";
const ActionGroup = ({
  record,
  handleViewComponent,
  handleEditComponent,
  handleDelete,
  method,
}) => {
  return (
    <div className="flex justify-evenly">
      <Dropdown
        overlay={
          <>
            <Menu style={{ width: "100px" }}>
              <Menu.Item
                key="view"
                icon={<IoEyeSharp size={18} />}
                onClick={() => handleViewComponent(record)}
              >
                View
              </Menu.Item>
              {(formatDate_WithMonth(record.date_received) ===
                formatDate_WithMonth(Date()) ||
                formatDate_WithMonth(record.date_spent) ===
                  formatDate_WithMonth(Date()) ||
                formatDate_WithMonth(record.date) ===
                  formatDate_WithMonth(Date()) ||
                method === "category") && (
                <>
                  <Menu.Item
                    key={"edit"}
                    icon={<FaEdit size={18} />}
                    onClick={() => handleEditComponent(record)}
                  >
                    Edit
                  </Menu.Item>
                  {method !== "category" && (
                    <>
                      <Popconfirm
                        title="Are you sure you want to delete ?"
                        onConfirm={() => handleDelete(record)}
                      >
                        <Menu.Item
                          key={"Delete"}
                          icon={<AiFillDelete size={18} />}
                        >
                          Delete
                        </Menu.Item>
                      </Popconfirm>
                    </>
                  )}
                </>
              )}
            </Menu>
          </>
        }
        trigger={["click"]}
      >
        <HiEllipsisHorizontal className="cursor-pointer" size={22} />
      </Dropdown>
    </div>
  );
};

export default ActionGroup;
