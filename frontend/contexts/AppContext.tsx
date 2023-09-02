"use client";
import React, { useState, createContext, useContext, useEffect } from "react";
import Cookie from "js-cookie";
import { gql } from "@apollo/client";
import { client } from "@/fassades/components/MyApolloProvider";

export interface User {
    username: string;
    email: string;
}

export interface CartItem {
    id: string;
    quantity: number;
    attributes: {
        price: number;
    };
}

export interface Cart {
    items: Array<CartItem>;
    total: number;
}

export interface AppContextType {
    user: User;
    setUser: Function;
    cart: Cart;
    addItem: (item: CartItem) => void;
    removeItem: (item: CartItem) => void;
    resetCart: () => void;
    showCart: boolean;
    setShowCart: Function;
}

const AppContext = createContext({} as AppContextType);

export function AppProvider({
    children,
}: {
    children: React.ReactNode;
}): JSX.Element {
    const cartCookie =
        Cookie.get("cart") !== "undefined" ? Cookie.get("cart") : null;

    const [user, setUser] = useState<User>({} as User);
    const [showCart, setShowCart] = useState(true);
    const [cart, setCart] = useState<Cart>(
        cartCookie ? JSON.parse(cartCookie) : { items: [], total: 0 }
    );

    useEffect(() => {
        const fetchData = async () => {
            const userData = await getUser();
            setUser(userData);
        };

        fetchData();
    }, []);

    useEffect(() => {
        Cookie.set("cart", JSON.stringify(cart));
    }, [cart]);

    const addItem = (item: CartItem) => {
        let newItem = cart.items.find((i) => i.id === item.id);
        if (!newItem) {
            const newItem = {
                quantify: 1,
                ...item,
            };
            setCart((prevCart) => ({
                items: [...prevCart.items, newItem],
                total: prevCart.total + item.attributes.price,
            }));
        }
    };

    const removeItem = (item: CartItem) => {
        let newItem: CartItem | undefined = cart.items.find(
            (i) => i.id === item.id
        );
        if (typeof newItem !== "undefined" && newItem.quantity > 1) {
            setCart((prevCart) => ({
                items: prevCart.items.map((i) =>
                    typeof newItem !== "undefined" && i.id !== newItem.id
                        ? { ...i, quantity: i.quantity - 1 }
                        : i
                ),
                total: prevCart.total - item.attributes.price,
            }));
        } else {
            setCart((prevCart) => ({
                items: prevCart.items.filter((i) => i.id !== item.id),
                total: prevCart.total - item.attributes.price,
            }));
        }
    };

    const resetCart = () => {
        setCart({ items: [], total: 0 });
    };

    return (
        <AppContext.Provider
            value={{
                user,
                setUser,
                cart,
                addItem,
                removeItem,
                resetCart,
                showCart,
                setShowCart,
            }}
        >
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
