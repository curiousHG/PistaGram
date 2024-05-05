import { useContext, useState } from "react";
import { createContext } from "react";

const DEFAULT_SIDEBAR: any = null;
export const SidebarContext = createContext(DEFAULT_SIDEBAR);

export const useSidebarContext = () => {
    return useContext(SidebarContext);
};

export const SidebarContextProvider = (props: any) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <SidebarContext.Provider value={{ sidebarOpen, setSidebarOpen }}>
            {props.children}
        </SidebarContext.Provider>
    );
};
