import { createContext, useContext, useState } from "react";

const DEFAULT_USER: any = null;

export const AuthContext = createContext(DEFAULT_USER);

export const useAuthContext = () => {
    return useContext(AuthContext);
};

export const AuthContextProvider = (props: any) => {
    const [authUser, setAuthUser] = useState(
        JSON.parse(localStorage.getItem("auth-user")) || null
    );
    return (
        <AuthContext.Provider value={{ authUser, setAuthUser }}>
            {props.children}
        </AuthContext.Provider>
    );
};
