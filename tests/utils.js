import React from "react";
import { ClientContext, LocalGraphQLClient } from "graphql-hooks";
import { render } from "@testing-library/react";
const customRender = (ui, options) => {
  const client = new LocalGraphQLClient({
    localQueries: options.localQueries,
  });

  const Wrapper = ({ children }) => {
    return (
      <ClientContext.Provider value={client}>{children}</ClientContext.Provider>
    );
  };

  return render(ui, {
    wrapper: Wrapper,
    ...options,
  });
};

export * from "@testing-library/react";

export { customRender as render };
