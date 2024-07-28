import { describe, it, expect } from "vitest";
import {
  addItem,
  removeItem,
  clearItems,
  selectedItemsReducer,
} from "./selectedItemsSlice";

describe("selectedItemsSlice", () => {
  it("should add an item", () => {
    const initialState = { items: [] };
    const newItem = {
      name: "Luke Skywalker",
      url: "https://swapi.dev/api/people/1/",
      mass: "77",
      height: "172",
      hair_color: "blond",
      skin_color: "fair",
      eye_color: "blue",
      birth_year: "19BBY",
      gender: "male",
    };

    const nextState = selectedItemsReducer(initialState, addItem(newItem));
    expect(nextState.items).toContainEqual(newItem);
  });

  it("should remove an item", () => {
    const initialState = {
      items: [
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
      ],
    };
    const itemToRemove = "Luke Skywalker";

    const nextState = selectedItemsReducer(
      initialState,
      removeItem(itemToRemove),
    );
    expect(nextState.items).not.toContainEqual({ name: itemToRemove });
  });

  it("should clear all items", () => {
    const initialState = {
      items: [
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
      ],
    };

    const nextState = selectedItemsReducer(initialState, clearItems());
    expect(nextState.items).toEqual([]);
  });
});
