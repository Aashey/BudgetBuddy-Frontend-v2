import { useMutation, useQuery } from "react-query";
import { apiClient } from "../../api/apiClient";

const getExpenseTransaction = async ({ queryKey }) => {
  const [, filter] = queryKey;
  const filterRange = filter
    ? `?${`from_date=${filter.from_date}&to_date=${filter.to_date}`}`
    : "";
  const url = `/transaction/expense${filterRange}`;
  return await apiClient.get(url);
};

export const useExpenseTransaction = (filter) => {
  return useQuery(["getExpenseTransaction", filter], getExpenseTransaction, {
    refetchOnWindowFocus: false,
    retry: 1,
    keepPreviousData: true,
  });
};

const createExpenseTransaction = async (payload) => {
  return await apiClient.post("/transaction/expense", payload);
};

export const useCreateExpenseTransaction = () => {
  return useMutation(createExpenseTransaction);
};
const updateExpenseTransaction = async ({
  id,
  category_id,
  amount,
  date_spent,
  notes,
  is_recurring,
}) => {
  return await apiClient.put(`/transaction/expense/${id}`, {
    category_id,
    amount,
    date_spent,
    notes,
    is_recurring,
  });
};

export const useUpdateExpenseTransaction = () => {
  return useMutation(updateExpenseTransaction);
};
const deleteExpenseTransaction = async ({ id }) => {
  return await apiClient.delete(`/transaction/expense/${id}`);
};

export const useDeleteExpenseTransaction = () => {
  return useMutation(deleteExpenseTransaction);
};
