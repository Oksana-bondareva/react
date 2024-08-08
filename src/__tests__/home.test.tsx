import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Home from "../pages/index";
import { Provider } from "react-redux";
import { RouterContext } from "next/dist/shared/lib/router-context.shared-runtime";
import { vi } from "vitest";
import { NextRouter } from "next/router";
import { apiSlice } from "../utils/apiSlice";
import rootReducer, { RootState } from "../common/RootReducer/rootReducer";
import { configureStore } from "@reduxjs/toolkit";
import createFetchMock from "vitest-fetch-mock";
import { ThemeProvider } from "../components/Theme/ThemeContext";

export function createMockRouter(router: Partial<NextRouter>): NextRouter {
  return {
    basePath: "",
    pathname: "/",
    route: "/",
    asPath: "/",
    query: {},
    push: vi.fn(),
    replace: vi.fn(),
    reload: vi.fn(),
    back: vi.fn(),
    prefetch: vi.fn().mockResolvedValue(undefined),
    beforePopState: vi.fn(),
    events: {
      on: vi.fn(),
      off: vi.fn(),
      emit: vi.fn(),
    },
    isFallback: false,
    ...router,
  } as NextRouter;
}

const renderWithProviders = (
  ui: React.ReactElement,
  preloadedState: Partial<RootState> = {},
) => {
  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(apiSlice.middleware),
    preloadedState,
  });

  const router = createMockRouter({
    query: { search: "", page: "1", id: "" },
  });

  return render(
    <Provider store={store}>
      <RouterContext.Provider value={router}>
        <ThemeProvider>{ui}</ThemeProvider>
      </RouterContext.Provider>
    </Provider>,
  );
};

const fetchMock = createFetchMock(vi);
fetchMock.enableMocks();

test("updates search value on input change", () => {
  renderWithProviders(
    <Home initialData={{ results: [] }} currentPage={1} personData={null} />,
  );
  const input = screen.getByRole("textbox");
  fireEvent.change(input, { target: { value: "new search" } });
  expect((input as HTMLInputElement).value).toBe("new search");
});

test("calls handleSearch on form submit", () => {
  renderWithProviders(
    <Home initialData={{ results: [] }} currentPage={1} personData={null} />,
  );
  const input = screen.getByRole("textbox");
  const button = screen.getByRole("button", { name: /search/i });
  fireEvent.change(input, { target: { value: "test search" } });
  fireEvent.click(button);
  expect(screen.getByText("Page 1")).toBeInTheDocument();
});

test("updates page state on button click", async () => {
  const mockPush = vi.fn();
  const router = createMockRouter({ query: { page: "1" }, push: mockPush });

  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(apiSlice.middleware),
  });

  render(
    <Provider store={store}>
      <RouterContext.Provider value={router}>
        <ThemeProvider>
          <Home
            initialData={{ results: [] }}
            currentPage={1}
            personData={null}
          />
        </ThemeProvider>
      </RouterContext.Provider>
    </Provider>,
  );

  const nextButton = screen.getByText("Next");
  fireEvent.click(nextButton);

  await waitFor(() => {
    expect(mockPush).toHaveBeenCalledWith("/?search=test search&page=2");
  });
});
