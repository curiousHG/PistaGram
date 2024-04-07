import ReceiverInfo from "./ReceiverInfo.js";
import MessageBody from "./MessageBody.js";
import MessageInput from "./MessageInput.js";
import { TiMessages } from "react-icons/ti";
import { useAuthContext } from "../Context/AuthContext.js";
import useRoom from "../Context/SelectedRoomContext.js";
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
                        Welcome{" "}
                        <span className="text-black text-3xl">
                            {authUser.username}
                        </span>
                    </p>
                    <p> Select a room to view chat history</p>
                    <TiMessages className="text-3xl" />
                </div>
            </div>
        );
    };

    const RoomViewJSX = () => {
        return (
            <div className="flex flex-col justify-between bg-white-400 m-3 w-full rounded-3xl">
                <ReceiverInfo />
                <MessageBody />
                <MessageInput />
            </div>
        );
    };

    const { setMessages } = useRoom();

    useEffect(() => {
        return () => setMessages([]);
    }, [selectedRoom]);

    return selectedRoom === null ? <DefaultViewJSX /> : <RoomViewJSX />;
};

export default MessageContainer;
