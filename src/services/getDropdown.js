import { useQuery } from "react-query";
import { apiClient } from "./api/apiClient";

const getDropdown = async (method, slug) => {
  return await apiClient.get(`/dropdown/${method}/${slug}`);
};

export const useGetDropdown = (method, slug) => {
  return useQuery(
    ["getDropdown", method, slug],
    () => getDropdown(method, slug),
    {
      retry: 1,
      refetchOnWindowFocus: false,
    }
  );
};
