/*******************************************************************************
 * Auth Slices - Check login and set the state of authentication
 *******************************************************************************
 */
import axios from "axios";
import { apiEndpoints, apiHost } from "../config";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import jwt from "jsonwebtoken";

const initialState = {
  loading: false,
  hasError: false,
  token: "",
  isLogin: false,
  isSubmit: false,
  data: null,
  userData: {},
};

/* This function will check the email and password of the user
 * that matches to the database or not.
 * 'credential' is the data to check login
 * It returns the token
 */
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

    if (response.data.status) {
      localStorage.setItem("_token", response.data.token);
      return response.data;
    } else {
      localStorage.setItem("_token", "");
      return null;
    }
  } catch (err) {
    localStorage.setItem("_token", "");
    return "";
  }
});

/* This function set the state of authentication */
const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    setAuthState(state, action) {
      state.data = null;
      state.isLogin = false;
      state.token = "";
      state.isSubmit = false;
    },
    setSubmitState(state, action) {
      state.isSubmit = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(Login.pending, (state) => {
        if (state.loading === false) {
          state.loading = true;
          state.isSubmit = true;
        }
      })
      .addCase(Login.fulfilled, (state, action) => {
        state.isSubmit = true;
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

export const { setAuthState, setSubmitState } = authSlice.actions;
export default authSlice.reducer;
