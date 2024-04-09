import { createContext, useContext, useState } from "react";

const DEFAULT_ROOM: any = null;

export const RoomContext = createContext(DEFAULT_ROOM);

export const useRoom = () => {
    return useContext(RoomContext);
};

export const RoomContextProvider = (props: any) => {
    const [selectedRoom, setSelectedRoom] = useState(DEFAULT_ROOM);

    return (
        <RoomContext.Provider value={{ selectedRoom, setSelectedRoom }}>
            {props.children}
        </RoomContext.Provider>
    );
};
