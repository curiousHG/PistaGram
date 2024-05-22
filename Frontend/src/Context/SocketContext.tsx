import { createContext, useState, useEffect, useContext } from "react";
import { useAuthContext } from "./AuthContext";
import { io } from "socket.io-client";

const DEFAULT_SOCKET: any = null;

const SocketContext = createContext(DEFAULT_SOCKET);

export const useSocketContext = () => {
    return useContext(SocketContext);
};

export const SocketContextProvider = (props: any) => {
    const [socket, setSocket] = useState(DEFAULT_SOCKET);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const { authUser } = useAuthContext();

    useEffect(() => {
        if (authUser) {
            const socket = io("http://127.0.0.1/", {
                query: {
                    userId: authUser._id,
                },
            });

            setSocket(socket);
            socket.on("getOnlineUsers", (users) => {
                setOnlineUsers(users);
            });
        } else {
            if (socket) {
                socket.close();
                setSocket(null);
            }
        }
    }, [authUser]);

    return (
        <SocketContext.Provider value={{ socket, onlineUsers }}>
            {props.children}
        </SocketContext.Provider>
    );
};
