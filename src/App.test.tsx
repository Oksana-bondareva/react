import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import "@testing-library/jest-dom";
import App from "./App";
import { vi } from "vitest";

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
    render(
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
