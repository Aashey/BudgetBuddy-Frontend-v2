import { useQuery } from "react-query";
import { apiClient } from "../api/apiClient";

const getBalanceData = async () => {
  const response = await apiClient.get("analytics/balance");
  return response.data;
};

export const useBalanceData = () => {
  return useQuery("getBalanceData", getBalanceData, {
    refetchOnWindowFocus: false,
    retry: 1,
  });
};

const getBalanceChart = async () => {
  const response = await apiClient.get("analytics/balance/overview");
  return response?.data;
};

export const useBalanceChart = () => {
  return useQuery("getBalanceChart", getBalanceChart, {
    refetchOnWindowFocus: false,
    retry: 1,
  });
};
