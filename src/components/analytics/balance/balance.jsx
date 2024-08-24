import { Card, Skeleton } from "antd";
import BalanceCard from "./balance-card";
import BalanceCharts from "./balance-charts";
import { useBalanceData } from "../../../services/analytics/useBalanceData";
import BalanceTable from "./balance-table";

const BalanceAnalytics = () => {
  const { data, isLoading, isError } = useBalanceData();
  const balanceData = data?.data || {};

  const cardData = balanceData[balanceData.length - 1] || {};

  const balanceCards = [
    {
      title: "Opening Balance",
      amount: cardData?.opening_balance,
      color: "#1ABC9C",
    },
    {
      title: "Closing Balance",
      amount: cardData?.closing_balance,
      color: "#d35400",
    },
    {
      title: "Total Income",
      amount: cardData?.total_income,
      color: "#3498DB",
    },
    {
      title: "Total Expense",
      amount: cardData?.total_expense,
      color: "#E74C3C",
    },
    {
      title: "Total Saving",
      amount: cardData?.total_saving,
      color: "#F39C12",
    },
    {
      title: "Total Withdraw",
      amount: cardData?.total_withdraw,
      color: "#8854D0",
    },
  ];

  return (
    <>
      {/* Top Card Section  */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
        {balanceCards.map((card, index) => {
          return (
            <BalanceCard
              key={index}
              color={card.color}
              title={card.title}
              amount={card.amount}
            />
          );
        })}
      </div>

      {/* Middle OvC Section  */}
      <BalanceCharts />

      {/* End Table Section  */}
      <Card
        className="mt-4 mb-4"
        title={<div className="py-3">Balance Summary</div>}
      >
        <BalanceTable
          tableData={data?.data}
          error={isError}
          isLoading={isLoading}
        />
      </Card>
    </>
  );
};

export default BalanceAnalytics;
