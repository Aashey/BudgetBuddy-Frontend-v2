import { useQuery } from "react-query";
import { apiClient } from "../api/apiClient";

const getCashFlowData = async () => {
  return await apiClient.get("analytics/cash-flow/overview");
};

export const useCashFlowData = () => {
  return useQuery("getCashFlowData", getCashFlowData, {
    refetchOnWindowFocus: false,
    retry: 1,
  });
};
