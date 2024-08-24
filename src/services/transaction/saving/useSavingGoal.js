import { useMutation, useQuery } from "react-query";
import { apiClient } from "../../api/apiClient";

const getSavingGoal = async () => {
  const url = `/transaction/saving-goal`;
  return await apiClient.get(url);
};

export const useSavingGoal = () => {
  return useQuery(["getSavingGoal"], getSavingGoal, {
    refetchOnWindowFocus: false,
    retry: 1,
  });
};

const createSavingGoal = async (payload) => {
  return await apiClient.post("/transaction/saving-goal", payload);
};

export const useCreateSavingGoal = () => {
  return useMutation(createSavingGoal);
};
const updateSavingGoal = async ({ id, amount, notes }) => {
  return await apiClient.put(`/transaction/saving-goal/${id}`, {
    amount,
    notes,
  });
};

export const useUpdateSavingGoal = () => {
  return useMutation(updateSavingGoal);
};
const deleteSavingGoal = async (goalId) => {
  return await apiClient.delete(`/transaction/saving-goal/${goalId}`);
};

export const useDeleteSavingGoal = () => {
  return useMutation(deleteSavingGoal);
};
