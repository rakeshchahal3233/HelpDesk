import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginAPI, registerAPI } from "./authAPI";

// Async Thunks
export const login = createAsyncThunk("auth/login", async (credentials) => {
  const response = await loginAPI(credentials);
  return response; // the returned response will be used in the fulfilled case
});

export const register = createAsyncThunk("auth/register", async (credentials) => {
  const response = await registerAPI(credentials);
  return response; // the returned response will be used in the fulfilled case
});

export const fetchUser = createAsyncThunk("auth/fetchUser", async (_, { getState }) => {
  const token = getState().auth.token; // Get token from the Redux state
  if (!token) throw new Error("No token available");

  const response = await fetch("http://localhost:8000/api/users/user", {
    headers: {
      Authorization: `Bearer ${token}`, // Send token in the request header
    },
  });

  if (!response.ok) throw new Error("Failed to fetch user");

  return response.json();
});

const initialState = {
  isAuthenticated: localStorage.getItem("token") ? true : false,
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("token") || null,
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload; // Set user data from the API response
        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(fetchUser.rejected, (state) => {
        state.loading = false;
        state.user = null; // Reset user data if fetching failed
      });
    builder.addCase(login.fulfilled, (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
