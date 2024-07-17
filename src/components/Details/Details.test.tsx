import { render, screen, fireEvent } from "@testing-library/react";
import Details from "./Details";

describe("Details component", () => {
  it("Displays the details correctly", async () => {
    const idDetails = "1";
    render(<Details idDetails={idDetails} />);

    await screen.findByText("Name: Luke Skywalker");

    expect(screen.getByText("Mass: 77")).toBeInTheDocument();
    expect(screen.getByText("Height: 172")).toBeInTheDocument();
    expect(screen.getByText("Close")).toBeInTheDocument();
  });

  it("Closes the details when the button is clicked Close", async () => {
    const idDetails = "1";
    render(<Details idDetails={idDetails} />);

    await screen.findByText("Name: Luke Skywalker");

    fireEvent.click(screen.getByText("Close"));

    expect(screen.queryByText("Name: Luke Skywalker")).toBeNull();
  });
});
