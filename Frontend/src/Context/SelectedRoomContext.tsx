import { createContext, useContext, useState } from "react";

export const RoomContext = createContext({});

export const useRoomContext = () => {
    return useContext(RoomContext);
};

export const RoomContextProvider = (props: any) => {
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [selectedRoomMessages, setSelectedRoomMessages] = useState([]);

    return (
        <RoomContext.Provider
            value={{
                selectedRoom,
                setSelectedRoom,
                selectedRoomMessages,
                setSelectedRoomMessages,
            }}
        >
            {props.children}
        </RoomContext.Provider>
    );
};
