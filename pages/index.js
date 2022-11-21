import React from "react";
import { initializeGraphQL } from "../lib/graphql-client";
import graphQLRequest from "../lib/graphql-request";
import MainLayout from "../components/layouts/main";
import IssuesList, {
  OPEN_ISSUES_QUERY,
  openIssuesQueryOptions,
} from "../features/issues/issue-list";

export default function Home() {
  return (
    <section>
      <h1>Welcome to Facebook react issues manager!</h1>
      <IssuesList />
    </section>
  );
}

Home.getLayout = (page) => {
  return <MainLayout>{page}</MainLayout>;
};

export async function getStaticProps() {
  const client = initializeGraphQL();

  await graphQLRequest(client, OPEN_ISSUES_QUERY, openIssuesQueryOptions());

  return {
    props: {
      initialGraphQLState:
        client && client.cache && client.cache.getInitialState(),
    },
    revalidate: 1,
  };
}
