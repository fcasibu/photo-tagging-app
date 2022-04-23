import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import GameScreen from "../GameScreen";

const mockData = {
  url: "",
  name: "At my house",
  data: {
    Dragon: {
      name: "Dragon",
      url: "",
    },
  },
};

describe("Game", () => {
  it("should be able to open the character drawer", () => {
    render(
      <GameScreen
        url={mockData.url}
        name={mockData.name}
        data={mockData.data}
      />
    );
    const img = screen.getByRole("img", { name: "At my house" });
    userEvent.click(img);
    const drawer = screen.getByRole("heading", { name: "Dragon" });

    expect(drawer.textContent).toBe("Dragon");
  });
});
