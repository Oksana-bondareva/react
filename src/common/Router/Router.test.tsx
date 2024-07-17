import { render, screen } from "@testing-library/react";
import {
  createBrowserRouter,
  MemoryRouter,
  Route,
  Routes,
} from "react-router-dom";
import App from "../../App";
import NotFound from "../NotFound/NotFound";
import router from "./Router";

describe("Router", () => {
  test("renders App component for / route", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>,
    );

    expect(screen.getByText("Search")).toBeInTheDocument();
  });

  test("renders NotFound component for unknown route", () => {
    render(
      <MemoryRouter initialEntries={["/unknown-route"]}>
        <NotFound />
      </MemoryRouter>,
    );

    expect(screen.getByText("404 PAGE NOT FOUND")).toBeInTheDocument();
  });

  test("renders App component for /search route", () => {
    render(
      <MemoryRouter initialEntries={["/search"]}>
        <Routes>
          <Route path="/search" element={<App />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByText("Search")).toBeInTheDocument();
  });

  test("renders NotFound component for unknown route", () => {
    render(
      <MemoryRouter initialEntries={["/unknown-route"]}>
        <Routes>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByText("404 PAGE NOT FOUND")).toBeInTheDocument();
  });

  test("should be of type Router", () => {
    type PartialRouter = {
      routes?: unknown;
    };

    const isRouter = (
      obj: PartialRouter,
    ): obj is ReturnType<typeof createBrowserRouter> => {
      return obj instanceof Object && "routes" in obj;
    };

    expect(isRouter(router)).toBe(true);
  });
});
