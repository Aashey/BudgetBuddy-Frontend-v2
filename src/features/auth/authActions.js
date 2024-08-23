import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient } from "../../services/api/apiClient";

export const login = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await apiClient.post("/login", credentials);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.post("/logout");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
