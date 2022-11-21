import React, { useCallback, useState } from "react";
import { useQuery } from "graphql-hooks";
import Alert from "../../components/alert";
import IssuesListItem from "./issue-list-item";
import SearchBox from "../../components/search-input";

export const OPEN_ISSUES_QUERY = `
query openIssues($first: Int = 40 $after: String $query: String = "repo:facebook/react is:issue is:open") {
  search(query: $query, type: ISSUE, first: $first, after: $after) {
    pageInfo {
      hasNextPage
      hasPreviousPage
      endCursor
    }
    issueCount
    nodes {
      ... on Issue {
        id
        number
        title
        author {
          login
          url
        }
        state
        createdAt
        url
      }
    }
  }
}
`;

const ITEMS_PER_PAGE = 10;
export const DEFAULT_QUERY_STRING = "repo:facebook/react is:issue is:open";
export const openIssuesQueryOptions = (skip) => ({
  variables: {
    first: ITEMS_PER_PAGE,
    after: skip,
  },
  updateData: (prevResult, result) => ({
    ...result,
    search: {
      ...result.search,
      nodes: prevResult
        ? [...prevResult.search.nodes, ...result.search.nodes]
        : result.search.nodes,
    },
  }),
});

export default function IssuesList() {
  const [skip, setSkip] = useState();
  const [query, setQuery] = useState();
  const { loading, error, data, refetch } = useQuery(
    OPEN_ISSUES_QUERY,
    openIssuesQueryOptions(skip)
  );

  const handleRefetch = () =>
    refetch({ variables: { after: skip, query, first: ITEMS_PER_PAGE } });

  const getNext = () => {
    setSkip(endCursor);
  };

  const handleSearch = useCallback(
    (searchString) => {
      setQuery(searchString)
      refetch({
        variables: {
          query: `${DEFAULT_QUERY_STRING} in:title ${searchString}`,
          first: ITEMS_PER_PAGE,
        },
      });
    },
    []
  );

  if (error) return <Alert message="Error loading issues." type="error" />;
  if (!data) return <div>Loading</div>;

  const {
    search: {
      nodes: issues,
      issueCount,
      pageInfo: { hasNextPage, endCursor },
    },
  } = data;

  return (
    <section>
      {issues.length > 0 ? (
        <>
          <h3>{`Total: ${issueCount} issues`}</h3>
          <SearchBox onTextChange={handleSearch} />
          <table>
            <thead>
              <tr>
                <th>Date created</th>
                <th>Title</th>
                <th>Author</th>
                <th>State</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {issues.map((issue) => (
                <IssuesListItem
                  key={issue.id}
                  issue={issue}
                  handleRefetch={handleRefetch}
                />
              ))}
            </tbody>
          </table>
          <div>
            {hasNextPage ? (
              <button className="more" disabled={loading} onClick={getNext}>
                {" "}
                {loading ? "Loading..." : "Load more"}{" "}
              </button>
            ) : (
              ""
            )}
          </div>
        </>
      ) : (
        <Alert message="No issues" />
      )}
    </section>
  );
}
