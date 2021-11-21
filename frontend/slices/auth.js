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

    console.log(response);
    if (response.data.status) {
      localStorage.setItem("_token", response.data.token);
      return response.data;
    } else {
      localStorage.setItem("_token", "");
      return null;
    }
  } catch (err) {
    localStorage.setItem("_token", "");
    console.log(err);
    return "";
  }
});

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    setAuthState(state, action) {
      state.data = null;
      state.isLogin = false;
      state.token = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(Login.pending, (state) => {
        if (state.loading === false) {
          state.loading = true;
        }
      })
      .addCase(Login.fulfilled, (state, action) => {
        console.log(action.payload);
        if (action.payload != null) {
          state.token = action.payload.token;
          state.data = jwt.decode(action.payload.token);
          state.isLogin = true;
          state.loading = false;
          state.hasError = false;
        }
      })
      .addCase(Login.rejected, (state) => {
        state.isLogin = false;
        state.loading = false;
        state.hasError = true;
      });
  },
});

export const { setAuthState } = authSlice.actions;
export default authSlice.reducer;
