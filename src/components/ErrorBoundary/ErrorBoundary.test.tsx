import { render, screen } from "@testing-library/react";
import ErrorBoundary from "./ErrorBoundary";

const ThrowError = () => {
  throw new Error("Error");
};
describe("ErrorBoundary", () => {
  test("render message when there is an error", () => {
    render(<ErrorBoundary>{<ThrowError />}</ErrorBoundary>);

    expect(
      screen.getByText("Oops, something went wrong..."),
    ).toBeInTheDocument();
  });
});

test("render children when no error", () => {
  render(
    <ErrorBoundary>
      <div data-testid="child">Some child content</div>
    </ErrorBoundary>,
  );

  expect(screen.getByTestId("child")).toBeInTheDocument();
});
