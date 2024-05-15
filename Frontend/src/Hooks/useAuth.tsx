import { useState } from "react";
import { useAuthContext } from "../Context/AuthContext";
import { ILogin, ISignup } from "../interfaces";
import toast from "react-hot-toast";

const useAuth = () => {
    const [loading, setLoading] = useState(false);

    const { setAuthUser } = useAuthContext();

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

            if (data.error) {
                throw new Error(data.error);
            }

            localStorage.setItem("auth-user", JSON.stringify(data));
            setAuthUser(data);
            toast.success(`Signup successfull, logged in directly!`);
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const login = async ({ username, password }: ILogin) => {
        setLoading(true);

        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                }),
            });

            const data = await res.json();
            if (data.error) {
                throw new Error(data.error);
            }

            localStorage.setItem("auth-user", JSON.stringify(data));
            setAuthUser(data);
            toast.success(`Logged in successfully}!`);
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/auth/logout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await res.json();
            if (data.error) {
                throw new Error(data.error);
            }

            localStorage.removeItem("auth-user");
            setAuthUser(null);
            // Clear room context
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { loading, signup, login, logout };
};

export default useAuth;
