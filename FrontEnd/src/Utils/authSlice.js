import { createSlice } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";
import axios from "axios";


const token = localStorage.getItem("token");
const initialState = {
    user: token ? jwtDecode(token) : null,
    token: token || null
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            localStorage.setItem("token", action.payload.token);
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            localStorage.removeItem("token");
        }
    }
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;


// **Logout user if token is expired**
export const checkTokenExpiry = () => (dispatch) => {
  const token = localStorage.getItem("token");
  if (token) {
      const decoded = jwtDecode(token);
      if (decoded.exp * 1000 < Date.now()) {
          dispatch(logout());
          axios.post("http://localhost:3000/users/logout", {}, { withCredentials: true });
      }
  }
};