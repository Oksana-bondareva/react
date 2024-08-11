import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ErrorBoundary from "./ErrorBoundary";

describe("ErrorBoundary", () => {
  it("should render the button", () => {
    render(<ErrorBoundary />);
    const button = screen.getByRole("button", { name: /error/i });
    expect(button).toBeInTheDocument();
  });
});
