import { apiClient } from "../api/apiClient";
import { useMutation, useQuery } from "react-query";
const getUserProfile = async () => {
  return await apiClient.get("/user/profile");
};

export const useGetUserProfile = () => {
  return useQuery("getUserProfile", getUserProfile, {
    retry: 1,
    refetchOnWindowFocus: false,
  });
};
const updateUserProfile = async ({
  first_name,
  middle_name,
  last_name,
  phone_number,
  dob,
  address,
}) => {
  return await apiClient.post("/user/profile", {
    first_name,
    middle_name,
    last_name,
    phone_number,
    dob,
    address,
  });
};

export const useUpdateUserProfile = () => {
  return useMutation(updateUserProfile);
};
