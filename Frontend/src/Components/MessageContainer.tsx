import ReceiverInfo from "./ReceiverInfo.js";
import MessageBody from "./MessageBody.js";
import { TiMessages } from "react-icons/ti";
import { useAuthContext } from "../Context/AuthContext.js";
import { useRoom } from "../Context/RoomContext.js";
import { useEffect } from "react";

const MessageContainer = () => {
    const { authUser } = useAuthContext();
    const { selectedRoom, setSelectedRoom } = useRoom();

    useEffect(() => {
        return () => setSelectedRoom(null);
    }, [setSelectedRoom]);

    const DefaultViewJSX = () => {
        return (
            <div className="flex items-center justify-center w-full h-full">
                <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
                    <p>
                        {" "}
                        Welcome{"  "}
                        <span className="text-black text-3xl">
                            {authUser.username}
                        </span>
                    </p>
                    <p> Select a room to view chat history </p>
                    <div className="text-7xl">
                        <TiMessages />
                    </div>
                </div>
            </div>
        );
    };

    const RoomViewJSX = () => {
        return (
            <div className="h-full w-full flex flex-col justify-evenly bg-white-400 p-4 rounded-3xl">
                <ReceiverInfo />
                <MessageBody />
            </div>
        );
    };
    return selectedRoom === null ? <DefaultViewJSX /> : <RoomViewJSX />;
};

export default MessageContainer;
