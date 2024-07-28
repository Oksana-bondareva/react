import { render, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import Flyout from "./Flyout";
import { createStore } from "@reduxjs/toolkit";
import rootReducer from "../../common/RootReducer/rootReducer";

const store = createStore(rootReducer);

const renderWithProviders = (
  ui: React.ReactElement,
  store: ReturnType<typeof createStore>,
) => {
  return render(<Provider store={store}>{ui}</Provider>);
};

describe("Flyout component", () => {
  it("should dispatch clearItems when 'Unselect all' button is clicked", () => {
    const { getByText } = renderWithProviders(<Flyout />, store);
    fireEvent.click(getByText("Unselect all"));
    expect(store.getState().selectedItems.items).toEqual([]);
  });

  it("should render Flyout component correctly", () => {
    const { getByText } = renderWithProviders(<Flyout />, store);
    expect(getByText("Unselect all")).toBeInTheDocument();
    expect(getByText("Download")).toBeInTheDocument();
  });
});
