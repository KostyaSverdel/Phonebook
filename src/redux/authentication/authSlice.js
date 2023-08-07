import { createSlice } from '@reduxjs/toolkit';
import { loginUser, registerUser, logoutUser, refreshUser } from '../api';


const authInitialState = {
  user: {
    name: null,
    email: null,
  },
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
  loginError: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: authInitialState,
  extraReducers: builder => {
    builder
      .addCase(loginUser.pending, state => {
        state.loginError = false;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.user = payload.user;
        state.token = payload.token;
        state.isLoggedIn = true;
      })
      .addCase(loginUser.rejected, state => {
        state.loginError = true;
        // state.loginError = false;
      })
      .addCase(registerUser.pending, state => {
        state.loginError = false;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.user = payload.user;
        state.token = payload.token;
        state.isLoggedIn = true;
      })
      .addCase(registerUser.rejected, state => {
        state.loginError = true;
      })
      .addCase(logoutUser.fulfilled, state => {
        state.user.name = null;
        state.user.email = null;
        state.token = null;
        state.isLoggedIn = false;
      })
      .addCase(refreshUser.pending, state => {
        state.isRefreshing = true;
        state.loginError = false;
      })
      .addCase(refreshUser.fulfilled, (state, { payload }) => {
        state.user = payload;

        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(refreshUser.rejected, state => {
        state.isRefreshing = false;
      });
  },
});

export const authReducer = authSlice.reducer;