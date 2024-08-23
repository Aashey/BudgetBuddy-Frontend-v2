import { useMutation, useQuery } from "react-query";
import { apiClient } from "../../api/apiClient";

const getExpenseCategory = async ({ queryKey }) => {
  const [, filter] = queryKey;
  const filterRange = filter
    ? `?${`from_date=${filter.from_date}&to_date=${filter.to_date}`}`
    : "";
  const url = `/setup/expense-category${filterRange}`;
  return await apiClient.get(url);
};

export const useExpenseCategory = (filter) => {
  return useQuery(["getExpenseCategory", filter], getExpenseCategory, {
    refetchOnWindowFocus: false,
    retry: 1,
  });
};

const createExpenseCategory = async (payload) => {
  return await apiClient.post("/setup/expense-category", payload);
};

export const useCreateExpenseCategory = () => {
  return useMutation(createExpenseCategory);
};

const updateExpenseCategory = async ({ title, description, status, id }) => {
  return await apiClient.put(`/setup/expense-category/${id}`, {
    title,
    description,
    status,
  });
};

export const useUpdateExpenseCategory = () => {
  return useMutation(updateExpenseCategory);
};
