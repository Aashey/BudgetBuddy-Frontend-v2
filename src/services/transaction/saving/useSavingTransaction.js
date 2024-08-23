import { useMutation, useQuery } from "react-query";
import { apiClient } from "../../api/apiClient";

const getSavingTransaction = async ({ queryKey }) => {
  const [, filter] = queryKey;
  const filterRange = filter
    ? `?${`from_date=${filter.from_date}&to_date=${filter.to_date}`}`
    : "";
  const url = `/transaction/saving${filterRange}`;
  return await apiClient.get(url);
};

export const useSavingTransaction = (filter) => {
  return useQuery(["getSavingTransaction", filter], getSavingTransaction, {
    refetchOnWindowFocus: false,
    retry: 1,
    keepPreviousData: true,
  });
};

const createSavingTransaction = async (payload) => {
  return await apiClient.post("/transaction/saving", payload);
};

export const useCreateSavingTransaction = () => {
  return useMutation(createSavingTransaction);
};
const updateSavingTransaction = async ({ id, amount, notes }) => {
  return await apiClient.put(`/transaction/saving/${id}`, {
    amount,
    notes,
  });
};

export const useUpdateSavingTransaction = () => {
  return useMutation(updateSavingTransaction);
};
const deleteSavingTransaction = async ({ id }) => {
  return await apiClient.delete(`/transaction/saving/${id}`);
};

export const useDeleteSavingTransaction = () => {
  return useMutation(deleteSavingTransaction);
};
