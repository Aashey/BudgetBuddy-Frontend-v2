import { Avatar, Card, Typography } from "antd";
import CountUp from "react-countup";

const CashFlowCard = ({ color, title, amount, icon }) => {
  const { Text, Title } = Typography;
  return (
    <Card className="w-[50%]">
      <span className="flex justify-around items-center gap-0">
        <span className="flex flex-col">
          <Title level={4}> {title}</Title>
          <Text className="text-lg font-semibold">
            Rs. {<CountUp duration={0.8} end={amount} />}
          </Text>
        </span>
        <Avatar
          className="size-14 mr-4"
          style={{ color: `white`, backgroundColor: `${color}` }}
        >
          {icon}
        </Avatar>
      </span>
    </Card>
  );
};

export default CashFlowCard;
