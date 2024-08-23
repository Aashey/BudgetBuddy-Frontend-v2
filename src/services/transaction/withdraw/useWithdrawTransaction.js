import { useMutation, useQuery } from "react-query";
import { apiClient } from "../../api/apiClient";

const getWithdrawTransaction = async ({ queryKey }) => {
  const [, filter] = queryKey;
  const filterRange = filter
    ? `?${`from_date=${filter.from_date}&to_date=${filter.to_date}`}`
    : "";
  const url = `/transaction/withdraw${filterRange}`;
  return await apiClient.get(url);
};

export const useWithdrawTransaction = (filter) => {
  return useQuery(["getWithdrawTransaction", filter], getWithdrawTransaction, {
    refetchOnWindowFocus: false,
    retry: 1,
    keepPreviousData: true,
  });
};

const createWithdrawTransaction = async (payload) => {
  return await apiClient.post("/transaction/withdraw", payload);
};

export const useCreateWithdrawTransaction = () => {
  return useMutation(createWithdrawTransaction);
};
const updateWithdrawTransaction = async ({ id, amount, notes }) => {
  return await apiClient.put(`/transaction/withdraw/${id}`, {
    amount,
    notes,
  });
};

export const useUpdateWithdrawTransaction = () => {
  return useMutation(updateWithdrawTransaction);
};
const deleteWithdrawTransaction = async ({ id }) => {
  return await apiClient.delete(`/transaction/withdraw/${id}`);
};

export const useDeleteWithdrawTransaction = () => {
  return useMutation(deleteWithdrawTransaction);
};
