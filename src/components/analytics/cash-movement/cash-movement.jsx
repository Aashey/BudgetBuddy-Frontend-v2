import { Card, Table, Typography } from "antd";
import { formatDate_WithMonth } from "../../../utils/helper";
import { useCashMovementData } from "../../../services/analytics/useCashMovementData";
import { FaArrowTrendDown, FaArrowTrendUp } from "react-icons/fa6";
import CountUp from "react-countup";
import CashMovementCharts from "./CashMovementCharts";
import { useSavingGoal } from "../../../services/transaction/saving/useSavingGoal";

const CashMovementAnalytics = () => {
  const { Text, Title } = Typography;
  const { data } = useCashMovementData();
  const { data: savingData, isLoading, isError } = useSavingGoal();
  const total_cash_movement = data?.data?.data?.total_cash_movement;
  const charts_data = data?.data?.data?.charts_data;

  const savingGoalColumns = [
    {
      title: "S.N.",
      key: "s.n.",
      render: (_, record, index) => {
        return index + 1;
      },
    },
    {
      title: "Month",
      dataIndex: "for_month",
      key: "for_month",
    },
    {
      title: "Target Amount",
      dataIndex: "target_amount",
      key: "target_amount",
    },
  ];

  return (
    <>
      {/* Top Card Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card
          title={
            <div className="py-3 text-lg">
              {formatDate_WithMonth(Date())}(+ prev month)
            </div>
          }
        >
          <div className="flex justify-between items-center gap-4">
            <Card className="w-full">
              <Title level={4}>Savings</Title>
              <Text className="font-bold text-sm">
                Rs.{" "}
                <CountUp
                  duration={0.8}
                  end={total_cash_movement?.saving?.current_month}
                />
                (+
                <CountUp
                  duration={0.8}
                  end={total_cash_movement?.saving?.previous_month_balance}
                />
                )
              </Text>
            </Card>
            <Card className="w-full">
              <Title level={4}>Withdraw</Title>
              <Text className="font-bold text-sm">
                Rs.
                <CountUp
                  duration={0.8}
                  end={total_cash_movement?.withdraw?.current_month}
                />
              </Text>
            </Card>
          </div>
        </Card>
        <Card title={<div className="py-3 text-lg">Overall</div>}>
          <div className="flex justify-between items-center gap-4">
            <Card className="w-full">
              <Title level={4}>Savings</Title>
              <Text className="font-bold text-sm">
                Rs.
                <CountUp
                  duration={0.8}
                  end={total_cash_movement?.saving?.overall}
                />
              </Text>
            </Card>
            <Card className="w-full">
              <Title level={4}>Withdraw</Title>
              <Text className="font-bold text-sm">
                Rs.{" "}
                <CountUp
                  duration={0.8}
                  end={total_cash_movement?.withdraw?.overall}
                />
              </Text>
            </Card>
          </div>
        </Card>
        <Card title={<div className="py-3 text-lg">Saving Goal</div>}>
          <div className="flex justify-between items-center gap-4">
            <Card className="w-full">
              <Text className="font-bold text-2xl">
                Rs.{" "}
                <CountUp
                  duration={0.8}
                  end={total_cash_movement?.saving_goal?.current_month}
                />
              </Text>
            </Card>
          </div>
        </Card>
      </div>

      <CashMovementCharts charts_data={charts_data} />

      <Card title={<div className="py-3">Saving Goal</div>} className="mt-4">
        <Table
          loading={isLoading}
          dataSource={!isError ? savingData?.data?.data : []}
          columns={savingGoalColumns}
          pagination={false}
        />
      </Card>
    </>
  );
};

export default CashMovementAnalytics;
