import { useEffect, useState } from "react";
import { useRoomContext } from "../Context/SelectedRoomContext";
import Message from "./Message";
import { useAuthContext } from "../Context/AuthContext";

const DEFAULT_ROOM_MESSAGES: any[] = [];
const MessageBody = () => {
    const { authUser } = useAuthContext();
    const [roomMessages, setRoomMessages] = useState(DEFAULT_ROOM_MESSAGES);
    const { selectedRoom } = useRoomContext();

    useEffect(() => {
        const getRoomMessages = async () => {
            console.log(selectedRoom);
            const res = await fetch(`/api/messages/${selectedRoom._id}`);
            const data = await res.json();
            setRoomMessages(data);
        };
        getRoomMessages();
    }, []);

    return (
        <div className="px-4 h-full mb-3 overflow-auto">
            {roomMessages?.map((message) => (
                <Message
                    key={message._id}
                    sender={authUser}
                    receiver={selectedRoom}
                    message={message}
                />
            ))}
        </div>
    );
};

export default MessageBody;
