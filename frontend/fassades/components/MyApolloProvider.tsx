"use client";
import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const API_URL = process.env.STRAPI_URL || "http://127.0.0.1:1337";

export const client = new ApolloClient({
    uri: `${API_URL}/graphql`,
    cache: new InMemoryCache(),
    defaultOptions: {
        mutate: {
            errorPolicy: "all",
        },
        query: {
            errorPolicy: "all",
        },
    },
});
interface MyApolloProviderProps {
    children: React.ReactNode;
}

function MyApolloProvider({ children }: MyApolloProviderProps): JSX.Element {
    return <ApolloProvider client={client}>{children}</ApolloProvider>;
}

export default MyApolloProvider;
