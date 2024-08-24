import { createSlice } from "@reduxjs/toolkit";
import { login, logout } from "./authActions";

const initialState = {
  loading: false,
  token: null,
  error: null,
  expirationTime: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth(state, action) {
      state.token = action.payload.token;
      state.expirationTime = action.payload.expirationTime;
      state.isAuthenticated = true;
    },
    clearAuth(state) {
      state.token = null;
      state.expirationTime = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setAuth, clearAuth } = authSlice.actions;

export const selectToken = (state) => state.auth.token;

export default authSlice.reducer;
