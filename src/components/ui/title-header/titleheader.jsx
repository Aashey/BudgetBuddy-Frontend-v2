import { Button, Card, Typography } from "antd";
import { IoMdAddCircle } from "react-icons/io";
import { useSelector } from "react-redux";
import { capitalizeInitialChar } from "../../../utils/helper";

const TitleHeader = ({ headerProps }) => {
  const { mode: theme } = useSelector((state) => state.theme);
  const { Title, Text } = Typography;
  return (
    <div
    // style={{
    //   backgroundColor: `${theme === "light" ? "#EDEDFA" : ""}`,
    // }}
    >
      <div className="flex justify-between items-center rounded-none shadow-transparent">
        <span className="flex flex-col">
          <Title
            style={{
              color: `${theme === "light" ? "#7b03fc" : "#C186FF"}`,
            }}
            level={2}
          >
            {capitalizeInitialChar(headerProps.type)}{" "}
            {capitalizeInitialChar(headerProps.method)}
          </Title>
          <Text strong>
            {headerProps.method !== "history" &&
              `Manage your ${headerProps.type} ${headerProps.method}`}
          </Text>
        </span>
        {headerProps.method !== "history" && (
          <>
            <Button
              onClick={() => {
                headerProps.openDrawer();
                headerProps.setMode("create");
              }}
              type="primary"
              icon={<IoMdAddCircle size={18} />}
            >
              Add
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default TitleHeader;
