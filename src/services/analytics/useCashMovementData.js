import { useQuery } from "react-query";
import { apiClient } from "../api/apiClient";

const getCashMovementData = async () => {
  return await apiClient.get("analytics/cash-movement/overview");
};

export const useCashMovementData = () => {
  return useQuery("getCashMovementData", getCashMovementData, {
    refetchOnWindowFocus: false,
    retry: 1,
  });
};
