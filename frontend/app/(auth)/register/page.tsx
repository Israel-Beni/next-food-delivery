"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/contexts/AppContext";
import { gql, useMutation } from "@apollo/client";
import Cookie from "js-cookie";

import Form from "@/components/Form";
import Loader from "@/components/Loader";

const REGISTER_MUTATION = gql(`
    mutation Register($username: String!, $email: String!, $passowrd: String!) {
        register(input: { username: $username, email: $email, password: $password}) {
            jwt
            user {
                username
                email
            }
        }
    }
`);

export interface FormData {
    email: string;
    password: string;
}

function RegisterRoute(): JSX.Element {
    const { setUser } = useAppContext();
    const router = useRouter();

    const [formData, setFormData] = useState<FormData>({
        email: "",
        password: "",
    });
    const [registerMutation, { loading, error }] =
        useMutation(REGISTER_MUTATION);

    const handleRegister = async () => {
        const { email, password } = formData;
        const { data } = await registerMutation({
            variables: { username: email, email: email, password },
        });
        if (data?.register.user) {
            setUser(data.register.user);
            router.push("/");
            Cookie.set("token", data.register.jwt);
        }
    };
    if (loading) return <Loader />;

    return (
        <Form
            title="Sign Up"
            buttonText="Sign Up"
            formData={formData}
            setFormData={setFormData}
            callback={handleRegister}
            error={error}
        />
    );
}

export default RegisterRoute;
