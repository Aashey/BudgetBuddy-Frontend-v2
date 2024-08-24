import dayjs from "dayjs";
import * as XLSX from "xlsx";

export const exportToExcel = (data, fileName) => {
  // Create a new workbook
  const workbook = XLSX.utils.book_new();

  // Convert data to worksheet
  const worksheet = XLSX.utils.json_to_sheet(data);

  // Append the worksheet to the workbook
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

  // Write the workbook to a file
  XLSX.writeFile(workbook, fileName);
};

export const capitalizeInitialChar = (string) => {
  console.log(string);
  return string[0].toUpperCase() + string.slice(1);
};

export const disableAfterToday = (current) => {
  return current && current > dayjs().endOf("day");
};
export const disablePrevMonth = (current) => {
  return current && current < dayjs().startOf("month");
};

export const disableAfterToday_AndPrevMonth = (current) => {
  return (
    current &&
    (current > dayjs().endOf("day") || current < dayjs().startOf("month"))
  );
};

export const formatDate = (fullDate) => {
  const date = new Date(fullDate);
  const options = { month: "short", day: "numeric", year: "numeric" };
  return date.toLocaleDateString("en-US", options);
};

export const formatDate_WithMonth = (fullDate) => {
  const date = new Date(fullDate);
  const options = { month: "long" };
  return date.toLocaleDateString("en-US", options);
};

export const getMonthName = (monthNumber) => {
  if (monthNumber >= 1 && monthNumber <= 12) {
    return dayjs()
      .month(monthNumber - 1)
      .format("MMMM");
  } else {
    return "Invalid month";
  }
};

export const percentageConversion = (num1, num2) => {
  if (num1 && num2) {
    const res1 = num1 / num2;
    return (100 / res1).toFixed(2);
  } else {
    return 0;
  }
};

export const getToday = () => {
  const today = dayjs().format("YYYY-MM-DD");
  return { from_date: today, to_date: today };
};

export const getYesterday = () => {
  const yesterday = dayjs().subtract(1, "day").format("YYYY-MM-DD");
  return { from_date: yesterday, to_date: yesterday };
};

export const getThisWeek = () => {
  const startOfWeek = dayjs().startOf("week").format("YYYY-MM-DD");
  const endOfWeek = dayjs().endOf("week").format("YYYY-MM-DD");
  return { from_date: startOfWeek, to_date: endOfWeek };
};

export const getThisMonth = () => {
  const startOfMonth = dayjs().startOf("month").format("YYYY-MM-DD");
  const endOfMonth = dayjs().endOf("month").format("YYYY-MM-DD");
  return { from_date: startOfMonth, to_date: endOfMonth };
};

// Function to generate colors dynamically
export const generateColors = (numColors) => {
  const baseColors = [
    "#FF4560",
    "#00E396",
    "#008FFB",
    "#775DD0",
    "#FEB019",
    "#FF66C2",
    "#A397D0",
    "#7D5BA6",
    "#3F9C35",
    "#FFC107",
    "#E91E63",
    "#9C27B0",
  ];

  let colors = [];
  for (let i = 0; i < numColors; i++) {
    colors.push(baseColors[i % baseColors.length]);
  }
  return colors;
};
