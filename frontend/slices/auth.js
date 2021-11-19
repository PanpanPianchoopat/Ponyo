import axios from "axios";
import { apiEndpoints, apiHost } from "../config";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import jwt from "jsonwebtoken";

const initialState = {
  loading: false,
  hasError: false,
  token: "",
  isLogin: false,
  data: null,
  userData: {},
};

export const Login = createAsyncThunk("User/Login", async (credential) => {
  try {
    const response = await axios.post(
      `${apiHost.default}${apiEndpoints.section.auth.login}`,
      {
        email: credential.email,
        password: credential.password,
      },
      {
        headers: { "content-type": "application/json" },
      }
    );
    localStorage.setItem("_token", response.data.user);
    return response.data;
  } catch (err) {
    localStorage.setItem("_token", "");
    return "";
  }
});

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    // setAuthState(state, action) {
    //state.userData = action.payload.userData;
    // state.isLogin = true;
    //state.token = action.payload.user;
    //},
  },
  extraReducers: (builder) => {
    builder
      .addCase(Login.pending, (state) => {
        if (state.loading === false) {
          state.loading = true;
        }
      })
      .addCase(Login.fulfilled, (state, action) => {
        state.token = action.payload.user;
        state.data = jwt.decode(action.payload.user);
        state.isLogin = true;
        state.loading = false;
        state.hasError = false;
      })
      .addCase(Login.rejected, (state) => {
        state.loading = false;
        state.hasError = true;
      });
  },
});

export const { setAuthState } = authSlice.actions;
export default authSlice.reducer;
