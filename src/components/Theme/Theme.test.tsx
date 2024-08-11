import { render, screen, fireEvent } from "@testing-library/react";
import ThemeToggle from "./ThemeToggle";
import { ThemeProvider, useTheme } from "./ThemeContext";
import { vi } from "vitest";
import ThemedWrapper from "./ThemedWrapper";
import themeStyles from "./Theme.module.css";

vi.mock("./ThemeContext", async (importOriginal) => {
  const actual = (await importOriginal()) as {
    ThemeProvider: React.ComponentType;
    useTheme: () => { theme: string; toggleTheme: () => void };
  };
  return {
    ...actual,
    useTheme: vi.fn(),
  };
});

test("renders ThemeToggle component with light theme", () => {
  (useTheme as jest.Mock).mockReturnValue({
    theme: "light",
    toggleTheme: vi.fn(),
  });

  render(
    <ThemeProvider>
      <ThemeToggle />
    </ThemeProvider>,
  );

  const buttonElement = screen.getByRole("button");
  expect(buttonElement).toHaveTextContent("Dark theme");
});

test("renders ThemeToggle component with dark theme", () => {
  (useTheme as jest.Mock).mockReturnValue({
    theme: "dark",
    toggleTheme: vi.fn(),
  });

  render(
    <ThemeProvider>
      <ThemeToggle />
    </ThemeProvider>,
  );

  const buttonElement = screen.getByRole("button");
  expect(buttonElement).toHaveTextContent("Light theme");
});

test("calls toggleTheme on button click", () => {
  const toggleThemeMock = vi.fn();
  (useTheme as jest.Mock).mockReturnValue({
    theme: "light",
    toggleTheme: toggleThemeMock,
  });

  render(
    <ThemeProvider>
      <ThemeToggle />
    </ThemeProvider>,
  );

  const buttonElement = screen.getByRole("button");
  fireEvent.click(buttonElement);
  expect(toggleThemeMock).toHaveBeenCalledTimes(1);
});

vi.mock("./ThemeContext", async (importOriginal) => {
  const actual = (await importOriginal()) as {
    useTheme: () => { theme: string };
  };
  return {
    ...actual,
    useTheme: vi.fn(),
  };
});

vi.mock("../../components/Theme/ThemeContext", async (importOriginal) => {
  const actual = (await importOriginal()) as {
    useTheme: () => { theme: string };
  };
  return {
    ...actual,
    useTheme: vi.fn(),
  };
});

test("renders ThemedWrapper component with light theme", () => {
  (useTheme as jest.Mock).mockReturnValue({
    theme: "light",
  });

  render(
    <ThemedWrapper>
      <div>Test Child</div>
    </ThemedWrapper>,
  );

  const wrapperElement = screen.getByText("Test Child").parentElement;
  expect(wrapperElement).toHaveClass(themeStyles.light);
});

test("renders ThemedWrapper component with dark theme", () => {
  (useTheme as jest.Mock).mockReturnValue({
    theme: "dark",
  });

  render(
    <ThemedWrapper>
      <div>Test Child</div>
    </ThemedWrapper>,
  );

  const wrapperElement = screen.getByText("Test Child").parentElement;
  expect(wrapperElement).toHaveClass(themeStyles.dark);
});
