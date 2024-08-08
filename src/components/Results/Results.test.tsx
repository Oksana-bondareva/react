import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import Results from "./Results";
import { selectedItemsReducer } from "../../utils/selectedItemsSlice";
import { RouterContext } from "next/dist/shared/lib/router-context.shared-runtime";
import { NextRouter } from "next/router";
import { vi } from "vitest";

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

const renderWithProviders = (ui: React.ReactElement) => {
  const store = configureStore({
    reducer: {
      selectedItems: selectedItemsReducer,
    },
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

const getByTextContent = (text: string) => {
  return screen.getByText((content, element) => {
    if (!element) return false; // Добавляем проверку на null
    const hasText = (element: Element) => element.textContent === text;
    const elementHasText = hasText(element);
    const childrenDontHaveText = Array.from(element.children).every(
      (child) => !hasText(child),
    );
    return elementHasText && childrenDontHaveText;
  });
};

describe("Results Component", () => {
  test("renders without crashing", () => {
    renderWithProviders(
      <Results data={mockData} personData={mockPersonData} currentPage={1} />,
    );
    expect(getByTextContent("Name: Luke Skywalker")).toBeInTheDocument();
  });

  test("handles item selection", () => {
    renderWithProviders(
      <Results data={mockData} personData={mockPersonData} currentPage={1} />,
    );
    const checkbox = screen.getAllByTestId("checkbox")[0];
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });

  test("handles card click", () => {
    renderWithProviders(
      <Results data={mockData} personData={mockPersonData} currentPage={1} />,
    );
    const card = screen.getAllByTestId("character-card")[0];
    fireEvent.click(card);
    expect(getByTextContent("Birth year: 19BBY")).toBeInTheDocument();
  });

  test("displays not found message when data is empty", () => {
    renderWithProviders(
      <Results data={[]} personData={mockPersonData} currentPage={1} />,
    );
    expect(screen.getByText("Oops, nothing was found!")).toBeInTheDocument();
  });

  test("displays Flyout when there are selected items", () => {
    const store = configureStore({
      reducer: {
        selectedItems: selectedItemsReducer,
      },
      preloadedState: {
        selectedItems: {
          items: [mockData[0]],
        },
      },
    });

    const router = createMockRouter({
      query: { search: "", page: "1", id: "" },
    });

    render(
      <Provider store={store}>
        <RouterContext.Provider value={router}>
          <Results
            data={mockData}
            personData={mockPersonData}
            currentPage={1}
          />
        </RouterContext.Provider>
      </Provider>,
    );

    expect(screen.getByTestId("flyout")).toBeInTheDocument();
  });
});
