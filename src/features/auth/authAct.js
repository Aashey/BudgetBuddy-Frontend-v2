import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { setAuth, clearAuth } from "./authSlice";
import { apiClient } from "../../services/api/apiClient";
import { message } from "antd";

export const useLogin = () => {
  const dispatch = useDispatch();

  return useMutation(
    async (credentials) => {
      const response = await apiClient.post("/login", credentials);
      return response.data;
    },
    {
      onSuccess: (data) => {
        dispatch(
          setAuth({ token: data.token, expirationTime: data.expires_at })
        );
      },
      onError: (error) => {
        message.error(error);
      },
    }
  );
};

export const useLogout = () => {
  const dispatch = useDispatch();

  return useMutation(
    async () => {
      await apiClient.post("/logout");
    },
    {
      onSuccess: () => {
        dispatch(clearAuth());
      },
      onError: (error) => {
        message.error(error);
      },
    }
  );
};
