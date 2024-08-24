import { Card, Select, Typography } from "antd";
import { useSelector } from "react-redux";
import { useBalanceChart } from "../../../services/analytics/useBalanceData";
import { useMemo, useState } from "react";
import Chart from "react-apexcharts";

const CashMovementCharts = ({ charts_data }) => {
  const { Title, Text } = Typography;
  const { mode: theme } = useSelector((state) => state.theme);

  const savingData = charts_data?.saving_data || [];
  const withdrawData = charts_data?.withdraw_data || [];

  const [chartType, setChartType] = useState("line");

  const savingWithdrawSeries = useMemo(
    () => [
      {
        name: "Savings",
        data: savingData,
      },
      {
        name: "Withdraws",
        data: withdrawData,
      },
    ],
    [savingData, withdrawData]
  );

  const savingWithdrawChartOptions = useMemo(
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
      colors: ["#3AC5AA", "#E74C3C"],
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
      className="p-2 mt-4"
      title={
        <span className="flex justify-between items-center">
          <Title level={5}>Saving Vs Withdraw</Title>
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
        options={savingWithdrawChartOptions}
        series={savingWithdrawSeries}
        type={chartType}
        height={250}
      />
    </Card>
  );
};

export default CashMovementCharts;
