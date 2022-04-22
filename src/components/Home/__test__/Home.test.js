import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter as Router, Routes, Route } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import MainContent from "../Content";
import Header from "../../Header/Header";

const mockImages = {
  Beach: {
    name: "Beach",
    url: "",
  },
};

describe("Home", () => {
  it("Navigates to correct page", () => {
    render(
      <Router initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<MainContent images={mockImages} />}>
            <Route path="Beach" element={<h1>Beach</h1>} />
          </Route>
        </Routes>
      </Router>
    );

    const beach = screen.getByRole("link");

    userEvent.click(beach);
    const beachTitle = screen.getByText("Beach");

    expect(beachTitle.textContent).toMatch(/beach/i);
  });
});
