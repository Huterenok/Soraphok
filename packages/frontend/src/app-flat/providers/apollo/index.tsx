import { FC, ReactNode } from "react";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { SharedProps } from "shared/config/type";

const client = new ApolloClient({
  uri: process.env.DB_URI,
  cache: new InMemoryCache(),
});

export const Apollo = ({ children }: SharedProps) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
