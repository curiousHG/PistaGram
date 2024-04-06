import { createContext, useContext, useState } from "react";

export const RoomContext = createContext({});

export const useRoomContext = () => {
    return useContext(RoomContext);
};

export const RoomContextProvider = (props: any) => {
    const [selectedRoom, setSelectedRoom] = useState(null);

    return (
        <RoomContext.Provider
            value={{
                selectedRoom,
                setSelectedRoom,
            }}
        >
            {props.children}
        </RoomContext.Provider>
    );
};
