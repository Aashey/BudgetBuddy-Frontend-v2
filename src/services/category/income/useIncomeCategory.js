import { useMutation, useQuery } from "react-query";
import { apiClient } from "../../api/apiClient";

const getIncomeCategory = async ({ filter }) => {
  const url = `/setup/income-category${filter ? `?${filter}` : ""}`;
  return await apiClient.get(url);
};

export const useIncomeCategory = (filter = "") => {
  return useQuery(["getIncomeCategory", filter], getIncomeCategory, {
    refetchOnWindowFocus: false,
    retry: 1,
  });
};

const createIncomeCategory = async (payload) => {
  return await apiClient.post("/setup/income-category", payload);
};

export const useCreateIncomeCategory = () => {
  return useMutation(createIncomeCategory);
};
const updateIncomeCategory = async ({ title, description, status, id }) => {
  return await apiClient.put(`/setup/income-category/${id}`, {
    title,
    description,
    status,
  });
};

export const useUpdateIncomeCategory = () => {
  return useMutation(updateIncomeCategory);
};
