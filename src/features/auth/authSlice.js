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
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.token = payload.token;
        state.expirationTime = payload.expires_at;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(login.rejected, (state, { payload }) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = payload;
      })
      .addCase(logout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.token = null;
        state.expirationTime = null;
        state.isAuthenticated = false;
        state.error = null;
      })
      .addCase(logout.rejected, (state, { payload }) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = payload;
      });
  },
});

export const selectToken = (state) => state.auth.token; // for headers in interceptor

export default authSlice.reducer;
