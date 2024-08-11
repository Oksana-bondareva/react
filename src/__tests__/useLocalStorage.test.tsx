import { act, renderHook } from "@testing-library/react";
import useSearchQuery from "../utils/useLocalStorage";

describe("useSearchQuery", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("should initialize with an empty search query", () => {
    const { result } = renderHook(() => useSearchQuery());
    expect(result.current.searchQuery).toBe("");
  });

  it("should set search query from localStorage on mount", () => {
    localStorage.setItem("searchQuery", "test query");
    const { result } = renderHook(() => useSearchQuery());
    expect(result.current.searchQuery).toBe("test query");
  });

  it("should update localStorage when search query changes", () => {
    const { result } = renderHook(() => useSearchQuery());
    act(() => {
      result.current.setSearchQuery("new query");
    });
    expect(localStorage.getItem("searchQuery")).toBe("new query");
  });

  it("should update search query state", () => {
    const { result } = renderHook(() => useSearchQuery());
    act(() => {
      result.current.setSearchQuery("another query");
    });
    expect(result.current.searchQuery).toBe("another query");
  });
});
