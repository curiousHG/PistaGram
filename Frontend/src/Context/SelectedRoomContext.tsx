import { createContext, useContext, useState } from "react";

export const SelectedRoomContext = createContext({});

export const useSelectedContext = () => {
    return useContext(SelectedRoomContext);
};

export const SelectedRoomContextProvider = (props: any) => {
    const [selectedRoom, setSelectedRoom] = useState(null);

    return (
        <SelectedRoomContext.Provider value={{ selectedRoom, setSelectedRoom }}>
            {props.children}
        </SelectedRoomContext.Provider>
    );
};
