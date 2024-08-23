import { useMutation, useQuery } from "react-query";
import { apiClient } from "../../api/apiClient";

const getIncomeCategory = async ({ queryKey }) => {
  const [, filter] = queryKey;
  const filterRange = filter
    ? `?${`from_date=${filter.from_date}&to_date=${filter.to_date}`}`
    : "";
  console.log("CHECK", filterRange);
  const url = `/setup/income-category${filterRange}`;
  return await apiClient.get(url);
};

export const useIncomeCategory = (filter) => {
  return useQuery(["getIncomeCategory", filter], getIncomeCategory, {
    refetchOnWindowFocus: false,
    retry: 1,
    keepPreviousData: true,
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
