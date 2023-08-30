"use client";
import React, { useState, createContext, useContext, useEffect } from "react";
import Cookie from "js-cookie";
import { gql } from "@apollo/client";
import { client } from "@/fassades/components/MyApolloProvider";

const AppContext = createContext({} as { user: any, setUser: any});

export function AppProvider({
    children,
}: {
    children: React.ReactNode;
}): JSX.Element {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const userData = await getUser();
            setUser(userData);
        };

        fetchData();
    }, []);

    return (
        <AppContext.Provider value={{ user, setUser }}>
            {children}
        </AppContext.Provider>
    );
}

const getUser = async (): Promise<any> => {
    const token = Cookie.get("token");
    if (!token) return null;
    const { data } = await client.query({
        query: gql(`
            query getUser {
                me {
                    id
                    email
                    username
                }
            }`),
        context: {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        },
    });

    return data.me;
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (context === undefined)
        throw new Error("useAppContext must be used within an AppProvider");
    return context;
};
