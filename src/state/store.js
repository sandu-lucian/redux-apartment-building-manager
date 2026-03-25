import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./usersSlice";
import apartmentsReducer from "./apartmentsSlice";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    apartments: apartmentsReducer,
  },
});
