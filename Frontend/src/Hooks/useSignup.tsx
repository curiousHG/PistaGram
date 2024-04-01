import React, { useState } from "react";
import toast from "react-hot-toast";

interface ISignup {
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    password: string;
}

const useSignup = () => {
    const [loading, setLoading] = useState(false);

    const signup = async ({
        firstname,
        lastname,
        username,
        email,
        password,
    }: ISignup) => {
        setLoading(true);
        try {
            const res = await fetch("api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    firstname,
                    lastname,
                    username,
                    email,
                    password,
                }),
            });

            const data = await res.json();
            console.log(data);
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { loading, signup };
};

export default useSignup;
