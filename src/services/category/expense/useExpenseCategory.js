import { useQuery } from "react-query";
import { apiClient } from "../../api/apiClient";

const getExpenseCategory = async (filter) => {
  const url = `/setup/expense-category${filter ? `?${filter}` : ""}`;
  return await apiClient.get(url);
};

export const useExpenseCategory = (filter = "") => {
  return useQuery(["getExpenseCategory", filter], () =>
    getExpenseCategory(filter)
  );
};
