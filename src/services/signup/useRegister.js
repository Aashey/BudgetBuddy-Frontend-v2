import { apiClient } from "../api/apiClient";
import { useMutation } from "react-query";

const registerUser = async ({
  username,
  email,
  password,
  password_confirmation,
}) => {
  console.log({
    username,
    email,
    password,
    password_confirmation,
  });
  return await apiClient.post(`/register`, {
    username,
    email,
    password,
    password_confirmation,
  });
};

export const useRegisterUser = () => {
  return useMutation(registerUser);
};
