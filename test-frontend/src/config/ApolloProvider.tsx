"use client";

import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloProvider,
} from "@apollo/client";

const client = new ApolloClient({
  link: new HttpLink({
    uri: "http://localhost:4000/graphql",
  }),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          owners: {
            keyArgs: ["page", "limit"],
            merge(existing, incoming, { args }) {
              const merged = existing ? { ...existing } : {};
              const key = `${args?.page || 1}-${args?.limit || 10}`;
              merged[key] = incoming;
              return merged;
            },
            read(existing, { args }) {
              const key = `${args?.page || 1}-${args?.limit || 10}`;
              return existing?.[key];
            },
          },
          animals: {
            keyArgs: ["page", "limit"],
            merge(existing, incoming, { args }) {
              const merged = existing ? { ...existing } : {};
              const key = `${args?.page || 1}-${args?.limit || 10}`;
              merged[key] = incoming;
              return merged;
            },
            read(existing, { args }) {
              const key = `${args?.page || 1}-${args?.limit || 10}`;
              return existing?.[key];
            },
          },
        },
      },
    },
  }),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "cache-first",
      nextFetchPolicy: "cache-first",
    },
    query: {
      fetchPolicy: "cache-first",
    },
  },
});

export function Providers({ children }: { children: React.ReactNode }) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
