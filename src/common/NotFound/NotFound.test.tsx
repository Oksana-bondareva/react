import { render } from "@testing-library/react";
import NotFound from "./NotFound";

test("renders 404 message", () => {
  const { getByText } = render(<NotFound />);
  const errorMessage = getByText(/404 PAGE NOT FOUND/i);

  expect(errorMessage).toBeInTheDocument();
});
