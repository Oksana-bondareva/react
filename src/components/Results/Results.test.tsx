import { render, fireEvent, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { vi } from "vitest";
import Results from "./Results";
import { apiSlice } from "../../utils/apiSlice";
import { selectedItemsReducer } from "../../utils/selectedItemsSlice";

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  }),
  useSearchParams: () => ({
    get: vi.fn(),
  }),
}));

const mockStore = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    selectedItems: selectedItemsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

const renderWithProviders = (ui: React.ReactElement) => {
  return render(<Provider store={mockStore}>{ui}</Provider>);
};

describe("Results Component", () => {
  const mockData = [
    {
      name: "Luke Skywalker",
      mass: "77",
      height: "172",
      hair_color: "blond",
      skin_color: "fair",
      eye_color: "blue",
      birth_year: "19BBY",
      gender: "male",
      url: "https://swapi.dev/api/people/1/",
    },
  ];

  const mockPersonData = {
    name: "Luke Skywalker",
    mass: "77",
    height: "172",
    hair_color: "blond",
    skin_color: "fair",
    eye_color: "blue",
    birth_year: "19BBY",
    gender: "male",
    url: "https://swapi.dev/api/people/1/",
  };

  it("should render the results correctly", () => {
    renderWithProviders(
      <Results data={mockData} personData={null} currentPage={1} />,
    );

    const elements = screen.getAllByText(/Name: Luke Skywalker/i);
    expect(elements).toHaveLength(1);
  });

  it("should handle checkbox change", () => {
    renderWithProviders(
      <Results data={mockData} personData={null} currentPage={1} />,
    );

    const checkbox = screen.getByTestId("checkbox");
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });

  it("should render Details component when selectedItemId is set", () => {
    renderWithProviders(
      <Results data={mockData} personData={mockPersonData} currentPage={1} />,
    );

    fireEvent.click(screen.getByTestId("character-card"));
    const elements = screen.getAllByText(/Name: Luke Skywalker/i);
    expect(elements).toHaveLength(2);
  });
});
