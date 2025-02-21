import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
    },
    updateProfile: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout, updateProfile } =
  authSlice.actions;

// **checkAuthStatus** - Check user authentication
export const checkAuthStatus = () => async (dispatch) => {
  try {
    console.log("Checking authentication status..."); // Debug log
    // Send request to protected route to check if user is still authenticated
    const res = await axios.get("http://localhost:3000/users/profile", {
      withCredentials: true,
    });
    console.log("User authenticated:", res.data); // Debug log

    // If the response is successful, mark the user as authenticated
    dispatch(loginSuccess({ user: res.data }));
  } catch (error) {
    // If there's an error (invalid or expired token), log out the user
    const res = await axios.get("http://localhost:3000/users/logout", {
      withCredentials: true,
    });
    dispatch(logout());
  }
};

export default authSlice.reducer;
