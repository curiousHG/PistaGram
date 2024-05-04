import { useContext, useState } from "react";
import { createContext } from "react";

const DEFAULT_USER_INFO: any = null;
export const UserInfoContext = createContext(DEFAULT_USER_INFO);

export const useUserInfoContext = () => {
    return useContext(UserInfoContext);
};

export const UserInfoContextProvider = (props: any) => {
    const [userInfoPopup, setUserInfoPopup] = useState(false);

    return (
        <UserInfoContext.Provider value={{ userInfoPopup, setUserInfoPopup }}>
            {props.children}
        </UserInfoContext.Provider>
    );
};
