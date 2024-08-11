import { act, render, screen } from "@testing-library/react";
import RootLayout from "../app/layout";
import { Provider } from "react-redux";
import { store } from "../common/store/Store";
import { vi } from "vitest";
import Page from "../app/page";

test("renders RootLayout component without crashing", () => {
  render(
    <RootLayout>
      <div>Test Child</div>
    </RootLayout>,
  );
  expect(screen.getByText("Test Child")).toBeInTheDocument();
});

vi.mock("../app/(home)/home", () => ({
  __esModule: true,
  default: () => <div>Home Component</div>,
}));

test("renders Home component after loading", async () => {
  await act(async () => {
    render(
      <Provider store={store}>
        <Page searchParams={{ search: "Luke", page: "1" }} />
      </Provider>,
    );
  });
  expect(await screen.findByText("Home Component")).toBeInTheDocument();
});
