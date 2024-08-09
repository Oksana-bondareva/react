import { render, screen } from "@testing-library/react";
import NotFoundComponent from "../app/not-found";

test("renders NotFound component", () => {
  render(<NotFoundComponent />);
  expect(screen.getByText("404 PAGE NOT FOUND")).toBeInTheDocument();
});
