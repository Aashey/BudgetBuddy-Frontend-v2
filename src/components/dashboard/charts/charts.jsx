import { Card, Dropdown, Select, Spin } from "antd";
import Title from "antd/es/typography/Title";
import { useMemo, useState } from "react";
import Chart from "react-apexcharts";
import { useSelector } from "react-redux";
import { formatDate_WithMonth } from "../../../utils/helper";

const DashboardIVECharts = ({ dashboardData }) => {
  const { mode: theme } = useSelector((state) => state.theme);
  const incomeData = dashboardData?.data?.charts_data?.income_data || [];
  const expenseData = dashboardData?.data?.charts_data?.expense_data || [];

  const [chartType, setChartType] = useState("line");

  const incomeExpenseSeries = useMemo(
    () => [
      {
        name: "Income",
        data: incomeData,
      },
      {
        name: "Expenses",
        data: expenseData,
      },
    ],
    [incomeData, expenseData]
  );

  const incomeExpenseChartOptions = useMemo(
    () => ({
      chart: {
        type: chartType,
        toolbar: false,
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "straight",
        width: 2,
      },
      markers: {
        size: 5,
      },
      grid: {
        show: true,
        borderColor: `${
          theme === "light"
            ? "rgba(235, 235, 235, 0.8)"
            : "rgba(255, 255, 255, 0.2)"
        }`,
        borderWidth: 0.1,
        strokeDashArray: 0,
        row: {
          colors: ["transparent", "transparent"],
        },
      },
      xaxis: {
        categories: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ],

        labels: {
          style: {
            colors: theme === "dark" ? "#ffffff" : "#000000",
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: theme === "dark" ? "#ffffff" : "#000000",
          },
        },
      },
      colors: ["#3498db", "#e74c3c"],
      tooltip: {
        theme: theme === "dark" ? "dark" : "light",
      },
      legend: {
        labels: {
          colors: theme === "dark" ? "#ffffff" : "#000000",
        },
      },
    }),
    [theme, chartType]
  );
  const chartOptions = [
    { label: "Line", value: "line" },
    { label: "Bar", value: "bar" },
  ];

  return (
    <Card
      className="p-2"
      title={
        <span className="flex justify-between items-center">
          <Title level={5}>Income Vs Expense</Title>
          <Select
            defaultValue={chartType}
            onChange={(value) => {
              setChartType(value);
            }}
            className="w-[100px] mb-2"
            options={chartOptions}
          />
        </span>
      }
    >
      <Chart
        options={incomeExpenseChartOptions}
        series={incomeExpenseSeries}
        type={chartType}
        height={250}
      />
    </Card>
  );
};

const DashboardIVEPIECharts = ({ dashboardData }) => {
  const [pieType, setPieType] = useState("donut");
  const { mode: theme } = useSelector((state) => state.theme);

  const incomeTotal =
    dashboardData?.data?.financial_data?.current_month?.total_income || 0;
  const expenseTotal =
    dashboardData?.data?.financial_data?.current_month?.total_expense || 0;

  const totalIncomeExpenseSeries = useMemo(
    () => [Number(incomeTotal), Number(expenseTotal)],
    [incomeTotal, expenseTotal]
  );

  const totalIncomeExpenseOptions = useMemo(
    () => ({
      chart: {
        type: pieType,
        toolbar: false,
      },
      dataLabels: {
        enabled: true,
      },
      legend: {
        position: "bottom",
        labels: {
          colors: theme === "dark" ? "#ffffff" : "#000000",
        },
      },
      plotOptions: {
        pie: {
          donut: {
            size: "70%",
          },
        },
      },
      colors: ["#3498db", "#e74c3c"],

      labels: ["Income", "Expense"],
    }),
    [theme, pieType]
  );

  const pieOptions = [
    { label: "Pie", value: "pie" },
    { label: "Donut", value: "donut" },
  ];
  return (
    <>
      <Card
        className="p-2"
        title={
          <span className="flex justify-between items-center">
            <Title level={5}>
              {formatDate_WithMonth(Date())}
              {`'`}s Summary:
            </Title>
            <Select
              defaultValue={pieType}
              onChange={(value) => {
                setPieType(value);
              }}
              className="w-[100px] mb-2"
              options={pieOptions}
            />
          </span>
        }
      >
        <Chart
          className="mt-4"
          options={totalIncomeExpenseOptions}
          series={totalIncomeExpenseSeries}
          type={pieType}
          height={250}
        />
      </Card>
    </>
  );
};

export { DashboardIVECharts, DashboardIVEPIECharts };
