import { vi } from "vitest";
import { getPeople } from "../app/(home)/home";
import { render, screen } from "@testing-library/react";
import Results from "../components/Results/Results";
import { Provider } from "react-redux";
import { store } from "../common/store/Store";
import { ResultItem } from "../utils/interfaces";
import Loader from "../components/Loader/Loader";
import Pagination from "../components/Pagination/Pagination";

test("fetches people successfully", async () => {
  const data = await getPeople("Luke", 1);
  expect(data).toHaveProperty("results");
});

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

const mockData: ResultItem[] = [
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
  {
    name: "Darth Vader",
    mass: "136",
    height: "202",
    hair_color: "none",
    skin_color: "white",
    eye_color: "yellow",
    birth_year: "41.9BBY",
    gender: "male",
    url: "https://swapi.dev/api/people/4/",
  },
];

test("renders list of results", () => {
  render(
    <Provider store={store}>
      <Results data={mockData} currentPage={1} personData={null} />
    </Provider>,
  );
  const resultItems = screen.getAllByRole("listitem");
  expect(resultItems).toHaveLength(2);
});

test("renders Loader component", () => {
  render(<Loader />);
  const loaderElement = screen.getByTestId("loader");
  expect(loaderElement).toBeInTheDocument();
});

test("renders Pagination with correct current page", () => {
  render(<Pagination currentPage={1} searchValue="Luke" />);
  const paginationElement = screen.getByText("Page 1");
  expect(paginationElement).toBeInTheDocument();
});
