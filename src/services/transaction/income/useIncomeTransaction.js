import { useMutation, useQuery } from "react-query";
import { apiClient } from "../../api/apiClient";

const getIncomeTransaction = async ({ queryKey }) => {
  const [, filter] = queryKey;
  const filterRange = filter
    ? `?${`from_date=${filter.from_date}&to_date=${filter.to_date}`}`
    : "";
  const url = `/transaction/income${filterRange}`;
  return await apiClient.get(url);
};

export const useIncomeTransaction = (filter) => {
  return useQuery(["getIncomeTransaction", filter], getIncomeTransaction, {
    refetchOnWindowFocus: false,
    retry: 1,
    keepPreviousData: true,
  });
};

const createIncomeTransaction = async (payload) => {
  return await apiClient.post("/transaction/income", payload);
};

export const useCreateIncomeTransaction = () => {
  return useMutation(createIncomeTransaction);
};
const updateIncomeTransaction = async ({
  id,
  category_id,
  amount,
  date_received,
  notes,
  is_recurring,
}) => {
  return await apiClient.put(`/transaction/income/${id}`, {
    category_id,
    amount,
    date_received,
    notes,
    is_recurring,
  });
};

export const useUpdateIncomeTransaction = () => {
  return useMutation(updateIncomeTransaction);
};
const deleteIncomeTransaction = async ({ id }) => {
  return await apiClient.delete(`/transaction/income/${id}`);
};

export const useDeleteIncomeTransaction = () => {
  return useMutation(deleteIncomeTransaction);
};
