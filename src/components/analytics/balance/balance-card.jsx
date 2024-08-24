import { Card, Typography } from "antd";
import CountUp from "react-countup";

const BalanceCard = ({ title, amount, color }) => {
  const { Title, Text } = Typography;
  return (
    <Card>
      <span>
        <Title level={3} style={{ color: `${color}` }}>
          {title}
        </Title>
        <span>
          <Text className="text-lg font-semibold">
            {" "}
            Rs. <CountUp duration={0.8} end={amount} />
          </Text>
        </span>
      </span>
    </Card>
  );
};

export default BalanceCard;
