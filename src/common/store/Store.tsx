import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../RootReducer/rootReducer";
import { apiSlice } from "../../utils/apiSlice";
import { createWrapper } from "next-redux-wrapper";

const store = () =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(apiSlice.middleware),
  });

export type AppDispatch = ReturnType<typeof store>["dispatch"];
export default store;
export const wrapper = createWrapper(store);
