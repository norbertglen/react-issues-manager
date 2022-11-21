import React from "react";
import { ClientContext } from "graphql-hooks";

import "../styles.css";
import { useGraphQLClient } from "../lib/graphql-client";

export default function App({ Component, pageProps }) {
  const graphQLClient = useGraphQLClient(pageProps?.initialGraphQLState);
  const getLayout = Component.getLayout || ((page) => page);

  return getLayout(
    <ClientContext.Provider value={graphQLClient}>
      <Component {...pageProps} />
    </ClientContext.Provider>
  );
}
