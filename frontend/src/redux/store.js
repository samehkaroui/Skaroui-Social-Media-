import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice"; // Ensure this matches the actual file structure

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default store;
