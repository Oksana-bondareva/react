import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import { BrowserRouter, MemoryRouter, Route, Routes } from "react-router-dom";
import "@testing-library/jest-dom";
import App from "./App";
import { vi } from "vitest";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { apiSlice } from "./utils/apiSlice";
import rootReducer, { RootState } from "./common/RootReducer/rootReducer";
import { ThemeProvider } from "./components/Theme/ThemeContext";
import store from "./common/store/Store";

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

  return render(<Provider store={store}>{ui}</Provider>);
};

vi.mock("../../components/SearchSection/SearchSection", () => ({
  SearchSection: vi.fn(() => <div>Mocked SearchSection</div>),
}));
vi.mock("../../components/ResultSection/ResultsSection", () => ({
  ResultsSection: vi.fn(() => <div>Mocked ResultsSection</div>),
}));

describe("Main component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("navigate to different page to click", () => {
    renderWithProviders(
      <ThemeProvider>
        <MemoryRouter initialEntries={["/?page=3"]}>
          <Routes>
            <Route path="/" element={<App />} />
          </Routes>
        </MemoryRouter>
      </ThemeProvider>,
    );

    fireEvent.click(screen.getByText("Search"));
    expect(screen.getByText("Search")).toBeInTheDocument();
  });

  it('The next page button should increase the page number', async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
        <ThemeProvider>
          <App />
          </ThemeProvider>
        </BrowserRouter>
      </Provider>,
    );

    await waitFor(() =>
      expect(
        screen.getByText((_, element) => {
          return element?.textContent === "Page 1";
        }),
      ).toBeInTheDocument(),
    );

    act(() => {
      fireEvent.click(screen.getByText('Next'));
    });

    await waitFor(() =>
      expect(
        screen.getByText((_, element) => {
          return element?.textContent === "Page 2";
        }),
      ).toBeInTheDocument(),
    );
  });

  it('The prev page button should increase the page number', async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
        <ThemeProvider>
          <App />
          </ThemeProvider>
        </BrowserRouter>
      </Provider>,
    );

    await waitFor(() =>
      expect(
        screen.getByText((_, element) => {
          return element?.textContent === "Page 2";
        }),
      ).toBeInTheDocument(),
    );

    act(() => {
      fireEvent.click(screen.getByText('Prev'));
    });

    await waitFor(() =>
      expect(
        screen.getByText((_, element) => {
          return element?.textContent === "Page 1";
        }),
      ).toBeInTheDocument(),
    );
  });
});
