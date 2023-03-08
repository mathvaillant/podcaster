// Base
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Testing
import "@testing-library/jest-dom";
import { describe, expect, it, vi } from "vitest";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";

// Mock Data
import APIResponse from "/@fixtures/allData.json";

// Components
import Home from "../Home.component";
import NotFound from "../../NotFound";

// Provider
import GlobalContextProvider from "/@/Context/Global/Global.context";

// Mock the useHome hook using vi.mock
vi.mock("../Home.hook", () => ({
  default: vi.fn(() => ({
    podcasts: APIResponse.feed.entry,
    handleFilter: vi.fn()
  }))
}));

describe("Home", () => {
  beforeEach(() => {
    render(
      <GlobalContextProvider>
        <RouterProvider
          router={createBrowserRouter([
            {
              path: "/",
              element: <Home />,
              errorElement: <NotFound />
            }
          ])}
        />
      </GlobalContextProvider>
    );
  });

  it("Should render the Home page", async () => {
    await waitFor(() => screen.getByTestId("badge"));

    expect(screen.getByTestId("page-layout")).toBeInTheDocument();
    expect(screen.getByTestId("filter-podcasts")).toBeInTheDocument();

    expect(screen.getAllByTestId("podcast-card")).toHaveLength(100);
  });

  it("Should search and reflect on the badge the number of podcasts result", async () => {
    await waitFor(() => screen.getByPlaceholderText("Filter podcasts"));

    const input = screen.getByPlaceholderText("Filter podcasts");

    fireEvent.change(input, { target: { value: "podc" } });

    const badge = screen.getByTestId("badge");
    expect(screen.getAllByTestId("podcast-card")).toHaveLength(
      Number(badge.textContent)
    );
  });
});
