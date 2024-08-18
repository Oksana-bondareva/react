import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FormData, FormState } from "../Modal/Interfaces";
import { countryList } from "../Modal/CountryList";

const initialState: FormState = {
  usersData: [],
  countries: countryList,
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    addData: (state, action: PayloadAction<FormData>) => {
      state.usersData.push(action.payload);
    },
  },
});

export const { addData } = formSlice.actions;

const store = configureStore({
  reducer: {
    form: formSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
