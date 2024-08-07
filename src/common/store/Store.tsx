import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../RootReducer/rootReducer";
import { apiSlice } from "../../utils/apiSlice";
import { createWrapper } from "next-redux-wrapper";

const makeStore = () => configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type AppDispatch = ReturnType<typeof makeStore>['dispatch'];
export type RootState = ReturnType<typeof makeStore>['getState'];

export const wrapper = createWrapper(makeStore);
