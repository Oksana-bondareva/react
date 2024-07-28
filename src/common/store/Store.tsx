import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../RootReducer/rootReducer";
import { apiSlice } from "../../utils/apiSlice";

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type AppDispatch = typeof store.dispatch;
export default store;
