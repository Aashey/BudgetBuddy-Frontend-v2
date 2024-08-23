import { useQuery } from "react-query";
import { apiClient } from "../api/apiClient";

const getTransaction = async ({ queryKey }) => {
  const [, queryParams] = queryKey;
  const url = `/transaction/get-transactions${
    queryParams ? `?${queryParams}` : ""
  }`;
  const response = await apiClient.get(url);
  return response?.data;
};

export const useGetTransaction = (queryParams = "") => {
  return useQuery(["getTransaction", queryParams], getTransaction, {
    refetchOnWindowFocus: false,
    retry: 1,
  });
};
