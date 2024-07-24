import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { vi } from "vitest";
import Details from "./Details";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { apiSlice } from "../../utils/apiSlice";
import rootReducer, { RootState } from "../../common/RootReducer/rootReducer";
import createFetchMock from "vitest-fetch-mock";

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

    renderWithProviders(
      <BrowserRouter>
        <Details />
      </BrowserRouter>,
    );

    await waitFor(() =>
      expect(
        screen.getByText((_, element) => {
          return element?.textContent === "Name: Luke Skywalker";
        }),
      ).toBeInTheDocument(),
    );

    const characterCard = screen.getByText((_, element) => {
      return element?.textContent === "Name: Luke Skywalker";
    });
    fireEvent.click(characterCard);

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

    renderWithProviders(
      <BrowserRouter>
        <Details />
      </BrowserRouter>,
    );

    await waitFor(() =>
      expect(
        screen.getByText((_, element) => {
          return element?.textContent === "Name: Luke Skywalker";
        }),
      ).toBeInTheDocument(),
    );

    const characterCard = screen.getByText((_, element) => {
      return element?.textContent === "Name: Luke Skywalker";
    });
    fireEvent.click(characterCard);
    screen.getByTestId("closeButton").click();
    await waitFor(() => expect(history.length).toEqual(1));
  });
});
