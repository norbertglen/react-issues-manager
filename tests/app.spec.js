/**
 * @jest-environment jsdom
 */
import React from "react";
import { OPEN_ISSUES_QUERY } from "../features/issues/issue-list";
import Home from "../pages";

import { render, screen } from "./utils";

const localQueries = {
  [OPEN_ISSUES_QUERY]: () => ({
    search: {
      nodes: [],
      pageInfo: { hasNextPage: false, endCursor: null },
    },
  }),
};

describe("App", () => {
  it("should render correctly", async () => {
    render(<Home />, {
      localQueries,
    });
    const welcomeText = await screen.findByText(
      /Welcome to Facebook react issues manager!/i
    );

    expect(welcomeText).toBeTruthy();
  });
});
