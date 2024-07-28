import { expect, test, vi } from "vitest";
import SearchForm from "./SearchForm";
import { fireEvent, render } from "@testing-library/react";

test("SearchForm calls onSearch when the button is clicked", () => {
  const mockOnSearch = (value: string) => {
    expect(value).toBe("Hello, test!");
  };

  const { getByText, getByPlaceholderText } = render(
    <SearchForm onSearch={mockOnSearch} />,
  );

  const input = getByPlaceholderText("Search...");
  const button = getByText("Search");

  fireEvent.change(input, { target: { value: "Hello, test!" } });
  fireEvent.click(button);
});

const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
};

beforeEach(() => {
  Object.defineProperty(window, "localStorage", {
    value: localStorageMock,
  });
});

test("The data is saved in localStorage", () => {
  const { getByPlaceholderText, getByText } = render(
    <SearchForm onSearch={() => {}} />,
  );

  const input = getByPlaceholderText("Search...");
  fireEvent.change(input, { target: { value: "Test query" } });

  const button = getByText("Search");
  fireEvent.click(button);

  expect(localStorageMock.setItem).toHaveBeenCalledWith(
    "searchQuery",
    "Test query",
  );
});

test("The data is obtained from localStorage", () => {
  Object.defineProperty(window, "localStorage", {
    value: localStorageMock,
  });

  localStorageMock.getItem.mockReturnValueOnce("Test query");
});
