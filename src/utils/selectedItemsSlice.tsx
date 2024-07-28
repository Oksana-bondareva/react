import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ResultItem } from "./interfaces";

export interface SelectedItemsState {
  items: ResultItem[];
}

const initialState: SelectedItemsState = {
  items: [],
};

const selectedItemsSlice = createSlice({
  name: "selectedItems",
  initialState,
  reducers: {
    addItem: (
      state,
      action: PayloadAction<{
        name: string;
        mass: string;
        height: string;
        hair_color: string;
        skin_color: string;
        eye_color: string;
        birth_year: string;
        gender: string;
        url: string;
      }>,
    ) => {
      const {
        name,
        height,
        url,
        mass,
        hair_color,
        skin_color,
        eye_color,
        birth_year,
        gender,
      } = action.payload;
      state.items.push({
        name,
        height,
        url,
        mass,
        hair_color,
        skin_color,
        eye_color,
        birth_year,
        gender,
      });
    },
    removeItem: (state, action: PayloadAction<string>) => {
      const itemNameToRemove = action.payload;
      state.items = state.items.filter(
        (item) => item.name !== itemNameToRemove,
      );
    },
    clearItems: (state) => {
      state.items = [];
    },
    downloadItems: (state) => {
      const csvData = state.items
        .map((item) => {
          return `"${item.name}","${item.height}", "${item.gender}", "${item.url}"`;
        })
        .join("\n");
      const blob = new Blob([csvData], { type: "text/csv;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${state.items.length}_persons.csv`;
      link.click();
      URL.revokeObjectURL(url);
    },
  },
});

export const { addItem, removeItem, clearItems, downloadItems } =
  selectedItemsSlice.actions;
export const selectedItemsReducer = selectedItemsSlice.reducer;
