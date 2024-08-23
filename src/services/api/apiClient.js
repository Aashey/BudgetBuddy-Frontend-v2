import axios from "axios";
import { selectToken } from "../../features/auth/authSlice";

// let token = null;

const apiClient = axios.create({
  baseURL: `http://127.0.0.1:8000/api`,
});

// store.subscribe(() => {
//   const state = store.getState();
//   token = selectToken(state);
//   console.log("Global Token", token);
// });
const setupInterceptors = (store) => {
  apiClient.interceptors.request.use(
    (config) => {
      if (store.getState().auth.token) {
        config.headers.Authorization = `Bearer ${store.getState().auth.token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};

export { apiClient, setupInterceptors };
