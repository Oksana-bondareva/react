import { combineReducers, Reducer } from '@reduxjs/toolkit';
import { apiSlice } from '../../utils/apiSlice';
import { selectedItemsReducer, SelectedItemsState } from '../../utils/selectedItemsSlice';

const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  selectedItems: selectedItemsReducer as Reducer<SelectedItemsState>,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
