import {
  configureStore,
  EnhancedStore,
  StoreEnhancer,
  Tuple,
  UnknownAction,
} from "@reduxjs/toolkit";
import { apiSlice } from "../../utils/apiSlice";
import {
  selectedItemsReducer,
  SelectedItemsState,
} from "../../utils/selectedItemsSlice";
import thunk from "redux-thunk";
import {
  CombinedState,
  QueryDefinition,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from "@reduxjs/toolkit/query";
import { ResultItem } from "../../utils/interfaces";

describe("Redux Store", () => {
  let store: EnhancedStore<
    {
      api: CombinedState<
        {
          getPersonById: QueryDefinition<
            string,
            BaseQueryFn<
              string | FetchArgs,
              unknown,
              FetchBaseQueryError,
              {},
              FetchBaseQueryMeta
            >,
            never,
            ResultItem,
            "api"
          >;
          getPeople: QueryDefinition<
            { search: string; page: number },
            BaseQueryFn<
              string | FetchArgs,
              unknown,
              FetchBaseQueryError,
              {},
              FetchBaseQueryMeta
            >,
            never,
            { results: ResultItem[] },
            "api"
          >;
        },
        never,
        "api"
      >;
      selectedItems: SelectedItemsState;
    },
    UnknownAction,
    Tuple<
      [
        StoreEnhancer<{
          dispatch: thunk.ThunkDispatch<
            {
              api: CombinedState<
                {
                  getPersonById: QueryDefinition<
                    string,
                    BaseQueryFn<
                      string | FetchArgs,
                      unknown,
                      FetchBaseQueryError,
                      {},
                      FetchBaseQueryMeta
                    >,
                    never,
                    ResultItem,
                    "api"
                  >;
                  getPeople: QueryDefinition<
                    { search: string; page: number },
                    BaseQueryFn<
                      string | FetchArgs,
                      unknown,
                      FetchBaseQueryError,
                      {},
                      FetchBaseQueryMeta
                    >,
                    never,
                    { results: ResultItem[] },
                    "api"
                  >;
                },
                never,
                "api"
              >;
              selectedItems: SelectedItemsState;
            },
            undefined,
            UnknownAction
          >;
        }>,
        StoreEnhancer,
      ]
    >
  >;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        selectedItems: selectedItemsReducer,
      },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    });
  });

  it("should have the correct reducers", () => {
    const state = store.getState();
    expect(state).toHaveProperty(apiSlice.reducerPath);
    expect(state).toHaveProperty("selectedItems");
  });

  it("should dispatch actions correctly", () => {
    const action = { type: "test/action" };
    store.dispatch(action);
    const state = store.getState();
    expect(state).toBeDefined();
  });
});
