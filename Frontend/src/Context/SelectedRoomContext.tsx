import { createContext, useContext, useState } from "react";

export const SelectedRoomContext = createContext({});

export const useSelectedContext = () => {
    return useContext(SelectedRoomContext);
};

export const SRoomContextProvider = (props: any) => {
    const [selectedRoom, setSelectedRoom] = useState(
        JSON.parse(localStorage.getItem("selected-room")) || null
    );

    return (
        <SelectedRoomContext.Provider value={{ selectedRoom, setSelectedRoom }}>
            {props.children}
        </SelectedRoomContext.Provider>
    );
};
