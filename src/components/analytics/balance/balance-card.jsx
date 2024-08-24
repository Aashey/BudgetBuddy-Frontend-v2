import { Card, Typography } from "antd";
import CountUp from "react-countup";

const BalanceCard = ({ title, amount, color }) => {
  const { Title, Text } = Typography;
  return (
    <Card>
      <span className="flex-1">
        <Title level={3} style={{ color: `${color}` }}>
          {title}
        </Title>
        <span className="flex flex-col">
          <Text className="text-lg ">
            {" "}
            Rs. <CountUp duration={0.8} end={amount} />
          </Text>
        </span>
      </span>
    </Card>
  );
};

export default BalanceCard;
