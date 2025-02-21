import { configureStore } from "@reduxjs/toolkit";
import menuReducer from "./menuSlice";
import authReducer from "./authSlice";
import videoReducer from "./videoSLice";

export const store = configureStore({
  reducer: {
    menu: menuReducer,
    auth: authReducer,
    video: videoReducer,
  },
});
