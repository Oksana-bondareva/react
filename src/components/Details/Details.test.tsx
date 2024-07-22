import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { vi } from "vitest";
import Details from "./Details";

global.fetch = vi.fn(() =>
  Promise.resolve({
    ok: true,
    json: () =>
      Promise.resolve({
        name: "Luke Skywalker",
        mass: "77",
        height: "172",
        hair_color: "blond",
        skin_color: "fair",
        eye_color: "blue",
        birth_year: "19BBY",
        gender: "male",
      }),
  }),
) as unknown as typeof fetch;

describe("Details component", () => {
  it("Displays the details correctly", async () => {
    render(
      <BrowserRouter>
        <Details />
      </BrowserRouter>,
    );

    await screen.findByText("Name: Luke Skywalker");

    expect(screen.getByText("Mass: 77")).toBeInTheDocument();
    expect(screen.getByText("Height: 172")).toBeInTheDocument();
    expect(screen.getByText("Close")).toBeInTheDocument();
  });

  it("Closes the details when the button is clicked", async () => {
    render(
      <BrowserRouter>
        <Details />
      </BrowserRouter>,
    );

    await screen.findByText("Name: Luke Skywalker");

    fireEvent.click(screen.getByText("Close"));

    expect(screen.queryByText("Name: Luke Skywalker")).toBeNull();
  });
});
