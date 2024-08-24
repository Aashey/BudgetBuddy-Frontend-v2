import { Card, Select } from "antd";
import Title from "antd/es/typography/Title";
import { useMemo, useState } from "react";
import Chart from "react-apexcharts";
import { useSelector } from "react-redux";
import { capitalizeInitialChar, generateColors } from "../../../utils/helper";

const CashFlowCharts = ({ chartData, type }) => {
  const [pieType, setPieType] = useState("pie");
  const { mode: theme } = useSelector((state) => state.theme);

  const colors = generateColors();

  const processChartData = (data) => ({
    labels: data?.title || [],
    values: data?.total?.map((value) => parseFloat(value)) || [],
  });

  const chartMapDataCurrent = {
    income: processChartData(chartData?.currentIncomeData),
    expense: processChartData(chartData?.currentExpenseData),
  };

  const chartMapDataOverall = {
    income: processChartData(chartData?.overallIncomeData),
    expense: processChartData(chartData?.overallExpenseData),
  };

  const [current, setCurrent] = useState(true);
  const [periodType, setPeriodType] = useState("current");

  const labelsForChart = current
    ? chartMapDataCurrent[type]
    : chartMapDataOverall[type];

  const totalChart = useMemo(
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
      colors: colors,
      labels: labelsForChart.labels,
    }),
    [theme, pieType, labelsForChart.labels]
  );

  const periodOptions = [
    { label: "Current", value: "current" },
    { label: "Overall", value: "overall" },
  ];

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
            <Title level={5}>{capitalizeInitialChar(type)}</Title>
            <span className="flex gap-4">
              <Select
                value={periodType}
                onChange={(value) => {
                  setCurrent(value === "current");
                  setPeriodType(value);
                }}
                className="w-[100px] mb-2"
                options={periodOptions}
              />
              <Select
                value={pieType}
                onChange={(value) => setPieType(value)}
                className="w-[100px] mb-2"
                options={pieOptions}
              />
            </span>
          </span>
        }
      >
        <Chart
          className="mt-4"
          options={totalChart}
          series={labelsForChart.values}
          type={pieType}
          height={250}
        />
      </Card>
    </>
  );
};

export default CashFlowCharts;
