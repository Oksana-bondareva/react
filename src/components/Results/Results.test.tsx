import { fireEvent, render, screen } from "@testing-library/react";
import Results from "./Results";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../../common/store/Store";

test('renders "Oops, nothing was found!" when data is empty', () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <Results data={[]} />
      </BrowserRouter>
    </Provider>,
  );
  const notFoundMessage = screen.getByText("Oops, nothing was found!");
  expect(notFoundMessage).toBeInTheDocument();
});

test("renders the specified number of cards", () => {
  const mockData = [
    {
      name: "",
      url: "",
      mass: "",
      height: "",
      hair_color: "",
      skin_color: "",
      eye_color: "",
      birth_year: "",
      gender: "",
    },
  ];

  render(
    <Provider store={store}>
      <BrowserRouter>
        <Results data={mockData} />
      </BrowserRouter>
    </Provider>,
  );

  const characterCards = screen.getAllByTestId("character-card");
  expect(characterCards).toHaveLength(mockData.length);
});

test("should show Details when clicking on results-card", () => {
  const mockData = [
    {
      name: "Luke Skywalker",
      url: "https://swapi.dev/api/people/1/",
      mass: "77",
      height: "172",
      hair_color: "blond",
      skin_color: "fair",
      eye_color: "blue",
      birth_year: "19BBY",
      gender: "male",
    },
  ];

  render(
    <Provider store={store}>
      <BrowserRouter>
        <Results data={mockData} />
      </BrowserRouter>
    </Provider>,
  );

  const characterCard = screen.getByText("Name: Luke Skywalker");
  fireEvent.click(characterCard);
  expect(characterCard).toBeInTheDocument();
});
