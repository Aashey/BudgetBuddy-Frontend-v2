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

export const percentageConversion = (num1, num2) => {
  const res1 = num1 / num2;
  return (100 / res1).toFixed(2);
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
