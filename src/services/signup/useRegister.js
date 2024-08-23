import { useMutation } from "react-query";
import { apiClient } from "../api/apiClient";

const registerUser = async ({
  username,
  email,
  password,
  password_confirmation,
}) => {
  return await apiClient.post("/register", {
    username,
    email,
    password,
    password_confirmation,
  });
};

const onSuccess = () => {
  console.log("Registered Successfully.");
};
const onError = (error) => {
  console.error("Registeration Failed.", error.response.data.errors);
};

export const useRegisterUser = () => {
  return useMutation(registerUser, { onSuccess, onError });
};
