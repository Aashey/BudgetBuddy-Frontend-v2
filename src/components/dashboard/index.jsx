import DashboardCard from "./card/card";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";
import { MdOutlineSavings } from "react-icons/md";
import { useGetTotalData } from "../../services/dashboard/useTotalData";
import { Card, Skeleton, Table, Tag } from "antd";
import {
  formatDate,
  formatDate_WithMonth,
  percentageConversion,
} from "../../utils/helper";
import { DashboardIVECharts, DashboardIVEPIECharts } from "./charts/charts";
import Title from "antd/es/typography/Title";
import { useGetTransaction } from "../../services/transaction/useTransactionHistory";
const Dashboard = () => {
  const { data: dashboardData, isLoading, isError } = useGetTotalData();
  const {
    data: transactionHistoryData,
    loading: transactionLoading,
    error: transactionError,
  } = useGetTransaction();

  const recentTransactions = transactionHistoryData?.data.slice(0, 5);

  const tagColor = {
    Income: "#3498db",
    Expense: "#e74c3c",
    Saving: "#f39c12",
    Withdraw: "#8854d0",
  };
  const transactionColumns = [
    {
      title: "S.N.",
      render: (_, record, index) => {
        return index + 1;
      },
    },
    {
      title: "Date",
      dataIndex: "created_at",
      key: "created_at",
      render: (text) => {
        return formatDate(text);
      },
    },
    {
      title: "Transaction Type",
      dataIndex: "transaction_type",
      key: "transaction_type",
      render: (text) => {
        return (
          <Tag
            className="size-6 text-white w-[60px] flex justify-center items-center"
            style={{
              backgroundColor: tagColor[text],
            }}
          >
            {text}
          </Tag>
        );
      },
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
  ];
  // total datas for cards
  const {
    balance = 0.0,
    total_expense = 0.0,
    total_income = 0.0,
    total_saving = 0.0,
    // total_withdraw = 0.0,
  } = dashboardData?.data?.financial_data?.current_month || {};

  // total percentage change datas
  const {
    balance: balanceChange = 0,
    total_expense: expenseChange = 0,
    total_income: incomeChange = 0,
    total_saving: savingChange = 0,
    total_withdraw: withdrawChange = 0,
  } = dashboardData?.data?.financial_data?.percentage_changes || {};

  // saving goal functionality
  const percentageChange = percentageConversion(
    dashboardData?.data?.financial_data?.current_month_goal,
    dashboardData?.data?.financial_data?.current_month?.total_saving
  );

  // Datas for cards
  const cards = [
    {
      title: "Total Balance",
      icon: <FaMoneyBillTransfer size={50} />,
      color: "#1abc9c",
      amount: balance,
      percentage: balanceChange,
    },
    {
      title: "Total Income",
      icon: <FaArrowTrendUp size={50} />,
      color: "#3498db",
      amount: total_income,
      percentage: incomeChange,
    },
    {
      title: "Total Expense",
      icon: <FaArrowTrendDown size={50} />,
      color: "#e74c3c",
      amount: total_expense,
      percentage: expenseChange,
    },
    {
      title: "Total Saving",
      icon: <MdOutlineSavings size={50} />,
      color: "#f39c12",
      amount: total_saving,
      percentage: null,
    },
  ];

  return (
    <>
      {/* Top Dashboard Cards  */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {isLoading ? (
          <Skeleton />
        ) : (
          <>
            {cards.map((card, index) => {
              return (
                <DashboardCard
                  key={index}
                  title={card.title}
                  amount={card.amount}
                  percentage={card.percentage}
                  color={card.color}
                  icon={card.icon}
                  goalPercentage={percentageChange}
                />
              );
            })}
          </>
        )}
      </div>

      {/* Middle Dashboard Charts  */}
      <div className="grid grid-cols-1 mt-4 gap-4  lg:grid-cols-12">
        <div className="lg:col-span-8">
          <DashboardIVECharts dashboardData={dashboardData} />
        </div>
        <div className="lg:col-span-4">
          <DashboardIVEPIECharts dashboardData={dashboardData} />
        </div>
      </div>

      {/* Bottom Top 5 transaction datas  */}
      <div className="mt-4 mb-4">
        <Card title={<div className="py-3">Recent Transaction</div>}>
          <Table
            rowKey={"id"}
            columns={transactionColumns}
            loading={transactionLoading}
            pagination={false}
            dataSource={!transactionError ? recentTransactions : []}
          />
        </Card>
      </div>
    </>
  );
};

export default Dashboard;
