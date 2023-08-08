import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { SERVER_URI } from "shared/config/constants";
import { SharedProps } from "shared/config/type";

const client = new ApolloClient({
  uri: SERVER_URI,
  cache: new InMemoryCache(),
});

export const Apollo = ({ children }: SharedProps) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
