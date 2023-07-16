import { FC, ReactNode } from "react";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: process.env.DB_URI,
  cache: new InMemoryCache(),
});

export const Apollo = ({ children }: { children: ReactNode }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
