import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FormData, FormState } from "../Modal/Interfaces";
import { countryList } from "../Modal/CountryList";

const initialState: FormState = {
  hookFormData: {
    name: "",
    age: 0,
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    terms: false,
    picture: null,
    country: "",
  },
  uncontrolledFormData: {
    name: "",
    age: 0,
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    terms: false,
    picture: null,
    country: "",
  },
  countries: countryList,
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setHookFormData: (state, action: PayloadAction<FormData>) => {
      state.hookFormData = action.payload;
    },
    setUncontrolledFormData: (state, action: PayloadAction<FormData>) => {
      state.uncontrolledFormData = action.payload;
    },
  },
});

export const { setHookFormData, setUncontrolledFormData } = formSlice.actions;

const store = configureStore({
  reducer: {
    form: formSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
