import { expect, vi } from "vitest";
import SearchForm from "./SearchForm";
import { render } from "@testing-library/react";

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
  useSearchParams: () => ({
    get: vi.fn(),
  }),
}));

describe("SearchForm", () => {
  it("should render the input and button", () => {
    const { getByPlaceholderText, getByRole } = render(
      <SearchForm initialSearchValue="test" />,
    );
    const input = getByPlaceholderText("Search...");
    const button = getByRole("button", { name: /search/i });
    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });
});
