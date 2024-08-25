import { useMutation } from "react-query";
import { apiClient } from "../api/apiClient";

const passwordChange = async ({
  current_password,
  new_password,
  new_password_confirmation,
}) => {
  try {
    const response = await apiClient.post("/user/change-password", {
      current_password,
      new_password,
      new_password_confirmation,
    });
    return response.data;
  } catch (error) {
    throw new error(error);
  }
};

export const usePasswordChange = () => {
  return useMutation(passwordChange);
};
