import { createContext, useContext, useState } from "react";

const DEFAULT_USER: any = null;

export const AuthContext = createContext(DEFAULT_USER);

export const useAuthContext = () => {
    return useContext(AuthContext);
};

export const AuthContextProvider = (props: any) => {
    // @ts-ignore
    const localStoreData = localStorage.getItem("auth-user");
    const [authUser, setAuthUser] = useState(
        localStoreData ? JSON.parse(localStoreData) : null
    );
    return (
        <AuthContext.Provider value={{ authUser, setAuthUser }}>
            {props.children}
        </AuthContext.Provider>
    );
};
