import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import App from "../../../App";

describe("Header", () => {
  it("Loads the header correctly", () => {
    render(<App />);

    const text = screen.getByRole("heading", { name: "Photo Tagging App" });

    expect(text.textContent).toMatch(/photo tagging app/i);
  });

  it("Navigates correctly to Home and Leaderboard page", () => {
    render(<App />);

    const homeLink = screen.getByRole("link", { name: "Home" });

    userEvent.click(homeLink);

    const home = screen.getByRole("heading", {
      name: "Choose to your liking",
    });
    expect(home).toBeInTheDocument();

    const leaderboardLink = screen.getByRole("link", { name: "Leaderboard" });

    userEvent.click(leaderboardLink);
    const leaderboard = screen.getByRole("heading", {
      name: "Leaderboard",
    });
    expect(leaderboard).toBeInTheDocument();
  });
});
