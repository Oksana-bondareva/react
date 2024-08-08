import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import Details from "./Details";
import rootReducer, { RootState } from "../../common/RootReducer/rootReducer";
import createFetchMock from "vitest-fetch-mock";
import { vi } from "vitest";
import { NextRouter } from "next/router";
import { apiSlice } from "../../utils/apiSlice";
import { RouterContext } from "next/dist/shared/lib/router-context.shared-runtime";

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
      <RouterContext.Provider value={router}>{ui}</RouterContext.Provider>
    </Provider>,
  );
};

const fetchMock = createFetchMock(vi);
fetchMock.enableMocks();

describe("Details component", () => {
  beforeEach((): void => {
    fetchMock.resetMocks();
  });

  test("Displays the details correctly", async () => {
    const mockData = {
      name: "Luke Skywalker",
      url: "https://swapi.dev/api/people/1/",
      mass: "77",
      height: "172",
      hair_color: "blond",
      skin_color: "fair",
      eye_color: "blue",
      birth_year: "19BBY",
      gender: "male",
    };
    fetchMock.mockResponse(JSON.stringify(mockData));

    renderWithProviders(<Details data={mockData} onClose={() => {}} />);

    await waitFor(() =>
      expect(screen.getByText("Name: Luke Skywalker")).toBeInTheDocument(),
    );

    expect(screen.getByText("Mass: 77")).toBeInTheDocument();
    expect(screen.getByText("Height: 172")).toBeInTheDocument();
    expect(screen.getByText("Close")).toBeInTheDocument();
  });

  test("navigates back on close button click", async () => {
    const mockData = {
      name: "Luke Skywalker",
      url: "https://swapi.dev/api/people/1/",
      mass: "77",
      height: "172",
      hair_color: "blond",
      skin_color: "fair",
      eye_color: "blue",
      birth_year: "19BBY",
      gender: "male",
    };
    fetchMock.mockResponse(JSON.stringify(mockData));

    renderWithProviders(<Details data={mockData} onClose={() => {}} />);

    await waitFor(() =>
      expect(screen.getByText("Name: Luke Skywalker")).toBeInTheDocument(),
    );

    screen.getByTestId("closeButton").click();
    await waitFor(() => expect(history.length).toEqual(1));
  });
});
