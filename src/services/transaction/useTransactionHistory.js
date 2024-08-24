import { useQuery } from "react-query";
import { apiClient } from "../api/apiClient";

const getTransaction = async ({ queryKey }) => {
  const [, filter] = queryKey;
  const filterRange = filter
    ? `?${`from_date=${filter.from_date}&to_date=${filter.to_date}`}`
    : "";
  const url = `/transaction/get-transactions${filterRange}`;
  const response = await apiClient.get(url);
  return response.data;
};

export const useGetTransaction = (queryParams) => {
  return useQuery(["getTransaction", queryParams], getTransaction, {
    refetchOnWindowFocus: false,
    retry: 1,
  });
};
