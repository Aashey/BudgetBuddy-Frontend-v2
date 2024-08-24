import { useQuery } from "react-query";
import { apiClient } from "../api/apiClient";

const getTotalData = async () => {
  const response = await apiClient.get("/dashboard/overview");
  return response.data;
};

export const useGetTotalData = () => {
  return useQuery("getTotalData", getTotalData, {
    refetchOnWindowFocus: false,
    retry: 1,
  });
};
