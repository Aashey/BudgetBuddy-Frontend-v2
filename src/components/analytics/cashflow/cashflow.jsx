import { Card, Table, Tag } from "antd";
import { useCashFlowData } from "../../../services/analytics/useCashFlowData";
import { formatDate_WithMonth, getMonthName } from "../../../utils/helper";
import CashFlowCard from "./cashFlowCard";
import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";
import CashFlowCharts from "./cashFlowCharts";

const CashFlowAnalytics = () => {
  const { data, isLoading, isError } = useCashFlowData();
  const cashFlowData = data?.data?.total_cash_flow;
  const currentChartData = data?.data?.charts?.current_total_by_category;
  const overallChartData = data?.data?.charts?.overall_total_by_category;

  const currentExpenseData = currentChartData?.expense_totals;
  const currentIncomeData = currentChartData?.income_totals;
  const overallExpenseData = overallChartData?.expense_totals;
  const overallIncomeData = overallChartData?.income_totals;

  const income_categories = data?.data?.top_3?.current_month?.income_categories;
  const expense_categories =
    data?.data?.top_3?.current_month?.expense_categories;
  const overall_income_categories =
    data?.data?.top_3?.overall?.income_categories;
  const overall_expense_categories =
    data?.data?.top_3?.overall?.expense_categories;

  const incomeByMonth = data?.data?.total_by_month_table?.income;
  const expenseByMonth = data?.data?.total_by_month_table?.expense;

  const overallCard = [
    {
      title: "Income",
      amount: cashFlowData?.income?.overall,
      icon: <FaArrowTrendUp size={30} />,
      color: "#3498DB",
    },
    {
      title: "Expense",
      amount: cashFlowData?.expense?.overall,
      icon: <FaArrowTrendDown size={30} />,
      color: "#E74C3C",
    },
  ];
  const currentMonthCard = [
    {
      title: "Income",
      amount: cashFlowData?.income?.current_month,
      icon: <FaArrowTrendUp size={30} />,
      color: "#3498DB",
    },
    {
      title: "Expense",
      amount: cashFlowData?.expense?.current_month,
      icon: <FaArrowTrendDown size={30} />,
      color: "#E74C3C",
    },
  ];

  const summaryTableColumn = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
    },
  ];

  const totalSummaryColumn = [
    {
      title: "Year",
      dataIndex: "year",
      key: "year",
    },
    {
      title: "Month",
      dataIndex: "month",
      key: "month",
      render: (text) => <>{getMonthName(text)}</>,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
  ];

  return (
    <>
      {/* Top Card Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
        <Card
          title={
            <div className="py-3 text-lg">{formatDate_WithMonth(Date())}</div>
          }
        >
          <div className="flex justify-between items-center gap-4">
            {currentMonthCard.map((card, index) => {
              return (
                <CashFlowCard
                  key={index}
                  color={card.color}
                  title={card.title}
                  amount={card.amount}
                  icon={card.icon}
                />
              );
            })}
          </div>
        </Card>
        <Card title={<div className="py-3 text-lg">Overall</div>}>
          <div className="flex justify-between items-center gap-4">
            {overallCard.map((card, index) => {
              return (
                <CashFlowCard
                  key={index}
                  color={card.color}
                  title={card.title}
                  amount={card.amount}
                  icon={card.icon}
                />
              );
            })}
          </div>
        </Card>
      </div>
      {/* Middle CHART Section  */}
      <div className="grid mt-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
        {!isLoading && (
          <>
            <CashFlowCharts
              type="income"
              chartData={{ currentIncomeData, overallIncomeData }}
            />
            <CashFlowCharts
              type="expense"
              chartData={{
                currentExpenseData,
                overallExpenseData,
              }}
            />
          </>
        )}
      </div>
      {/* End Table Section  */}
      <Card
        className="mt-4 mb-4"
        title={
          <div className="py-3">{formatDate_WithMonth(Date())} Summary</div>
        }
      >
        <div className="grid mt-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
          {!isLoading && (
            <>
              <Card>
                <Table
                  rowKey="id"
                  columns={summaryTableColumn}
                  dataSource={!isError ? income_categories : []}
                  pagination={false}
                  isLoading={isLoading}
                />
              </Card>
              <Card>
                <Table
                  rowKey="id"
                  columns={summaryTableColumn}
                  dataSource={!isError ? expense_categories : []}
                  isLoading={isLoading}
                  pagination={false}
                />
              </Card>
            </>
          )}
        </div>
      </Card>
      {/* Overall  */}
      <Card
        className="mt-4 mb-4"
        title={<div className="py-3">Overall Summary</div>}
      >
        <div className="grid mt-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
          <Card>
            <Table
              rowKey={"id"}
              columns={summaryTableColumn}
              dataSource={!isError ? overall_income_categories : []}
              isLoading={isLoading}
              pagination={false}
            />
          </Card>
          <Card>
            <Table
              rowKey={"id"}
              columns={summaryTableColumn}
              dataSource={!isError ? overall_expense_categories : []}
              error={isError}
              isLoading={isLoading}
              pagination={false}
            />
          </Card>
        </div>
      </Card>

      {/* footer table  */}
      <Card
        className="mt-4 mb-4"
        title={<div className="py-3">Total By Month</div>}
      >
        <div className="grid mt-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
          <Card>
            <Table
              rowKey={"id"}
              columns={totalSummaryColumn}
              dataSource={!isError ? incomeByMonth : []}
              isLoading={isLoading}
            />
          </Card>
          <Card>
            <Table
              rowKey={"id"}
              columns={totalSummaryColumn}
              dataSource={!isError ? expenseByMonth : []}
              error={isError}
              isLoading={isLoading}
            />
          </Card>
        </div>
      </Card>
    </>
  );
};

export default CashFlowAnalytics;
