"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/contexts/AppContext";
import { gql, useMutation } from "@apollo/client";
import Cookie from "js-cookie";

import Form from "@/components/Form";
import Loader from "@/components/Loader";

import type { FormData } from "../register/page";

const LOGIN_MUTATION = gql(`
    mutation Login($identifier: String!, $password: String!) {
        login(input: { identifier: $identifier, password: $password}) {
            jwt 
            user {
                username
                email
            }
        }
    }
`);

function LoginRoute(): JSX.Element {
    const { setUser } = useAppContext();
    const router = useRouter();

    const [formData, setFormData] = useState<FormData>({
        email: "",
        password: "",
    });
    const [loginMutation, { loading, error }] = useMutation(LOGIN_MUTATION);

    const handleLogin = async () => {
        const { email, password } = formData;
        const { data } = await loginMutation({
            variables: { identifier: email, password },
        });
        if (data?.login.user) {
            setUser(data.login.user);
            Cookie.set("token", data.login.jwt);
            router.push("/");
        }
    };

    if (loading) return <Loader />;

    return (
        <Form
            title="Login"
            buttonText="Login"
            formData={formData}
            setFormData={setFormData}
            callback={handleLogin}
            error={error}
        />
    );
}

export default LoginRoute;
