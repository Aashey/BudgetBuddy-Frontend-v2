import { Avatar, Card, Progress, Typography } from "antd";
import CountUp from "react-countup";

const DashboardCard = ({
  title,
  color,
  amount,
  percentage,
  icon,
  goalPercentage,
}) => {
  const { Title, Text } = Typography;
  return (
    <Card className="p-3">
      <span className="flex justify-evenly gap-4 items-center">
        <span className="flex-1">
          <Title level={3} style={{ color: `${color}` }}>
            {title}
          </Title>
          <span className="flex flex-col">
            <Text className="text-xl font-bold">
              {" "}
              Rs. <CountUp duration={0.8} end={amount} />
            </Text>
            {title !== "Total Saving" ? (
              <Text className="text-gray-500 mt-4" strong>
                {percentage >= 0 ? (
                  <>
                    <span className="bg-green-600 rounded-3xl px-1 text-white">
                      +{percentage} %
                    </span>{" "}
                    since last month
                  </>
                ) : (
                  <>
                    <span className="bg-red-600 rounded-3xl px-1 text-white">
                      {percentage} %
                    </span>{" "}
                    since last month
                  </>
                )}
              </Text>
            ) : (
              <>
                <Text className="text-gray-500 mt-2" strong>
                  Saving Progress
                </Text>
                <Progress percent={goalPercentage} />
              </>
            )}
          </span>
        </span>
        <Avatar
          //   size="large"
          className="size-max"
          style={{ color: `white`, backgroundColor: `${color}` }}
        >
          {icon}
        </Avatar>
      </span>
    </Card>
  );
};

export default DashboardCard;
