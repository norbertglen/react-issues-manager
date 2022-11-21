/**
 * @jest-environment jsdom
 */
import React from "react";
import IssuesList, { OPEN_ISSUES_QUERY } from "../features/issues/issue-list";
import data from "./data.json";

import { render, screen } from "./utils";

const localQueries = {
  [OPEN_ISSUES_QUERY]: () => ({
    search: {
      nodes: data,
      pageInfo: { hasNextPage: true, endCursor: data[data.length - 1].id },
    },
  }),
};

describe("Issues", () => {
  it("should render all issues fetched from the graphql", async () => {
    render(<IssuesList />, {
      localQueries,
    });

    expect(await screen.findAllByRole("listItem")).toHaveLength(data.length);
  });

  it('shows "No issues" if 0 issues are returned', async () => {
    const issues = [];
    jest.spyOn(localQueries, OPEN_ISSUES_QUERY).mockImplementation(() => ({
        search: {
          nodes: issues,
          pageInfo: {
            hasNextPage: false,
            endCursor: issues[issues.length - 1]?.id,
          },
        },
    }));

    render(<IssuesList />, {
      localQueries,
    });

    expect(await screen.findByText("No issues")).toBeTruthy();
  });
});
