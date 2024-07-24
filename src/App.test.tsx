import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import "@testing-library/jest-dom";
import App from "./App";
import { vi } from "vitest";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { apiSlice } from "./utils/apiSlice";
import rootReducer, { RootState } from "./common/RootReducer/rootReducer";

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
      <MemoryRouter initialEntries={["/?page=3"]}>
        <Routes>
          <Route path="/" element={<App />} />
        </Routes>
      </MemoryRouter>,
    );

    fireEvent.click(screen.getByText("Search"));
    expect(screen.getByText("Search")).toBeInTheDocument();
  });
});
