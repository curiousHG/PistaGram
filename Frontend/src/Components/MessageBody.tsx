import { IoSendSharp } from "react-icons/io5";
import { useAuthContext } from "../Context/AuthContext";
import { useRoomContext } from "../Context/RoomContext";
import Message from "./Message";
import useSendMessage from "../Hooks/useSendMessage";
import { useEffect, useMemo, useRef, useState } from "react";
import toast from "react-hot-toast";
import { IMessage } from "../interfaces";
import { useSocketContext } from "../Context/SocketContext";
import newMessageRingtone from "../Assets/newMessageRingtone.mp3";

const MessageBody = () => {
    const { authUser } = useAuthContext();
    const { selectedRoom } = useRoomContext();
    const { socket } = useSocketContext();

    // Send message hook
    const { sendMessage } = useSendMessage();

    const DEFAULT_MESSAGES: IMessage[] = [];

    // Loading state of the page
    const [loading, setLoading] = useState(false);

    const lastMessage = useRef<HTMLInputElement | null>(null);

    // For message body
    const [messages, setMessages] = useState(DEFAULT_MESSAGES);

    // States and handler for message input box
    const [message, setMessage] = useState("");
    const handleSendMessage = async () => {
        if (message !== "") {
            const data = await sendMessage({ message });
            setMessages([...messages, data]);
            lastMessage.current = data;
            setMessage("");
        }
    };

    const getMessages = useMemo(
        () => async () => {
            setLoading(true);
            try {
                const res = await fetch(`/api/messages/${selectedRoom._id}`);
                const data = await res.json();
                if (data.error) {
                    throw new Error(data.error);
                }
                setMessages(data);
            } catch (error: any) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        },
        [selectedRoom._id]
    );

    // Load messages in the room when selectedRoom is changed
    useEffect(() => {
        getMessages();
    }, [getMessages]);

    // When messages is changed scroll to the bottom of it
    useEffect(() => {
        setTimeout(() => {
            lastMessage.current?.scrollIntoView({
                behavior: messages.length > 5 ? "instant" : "smooth",
                block: "start",
                inline: "start",
            });
        }, 500);
    }, [messages]);

    // When socket listens to the event populate the messages with new messages
    useEffect(() => {
        socket?.on("newMessage", (newMessage: IMessage) => {
            const sound = new Audio(newMessageRingtone);
            sound.play();
            setMessages([...messages, newMessage]);
        });

        return () => socket?.off("newMessage");
    }, [socket, messages, setMessages]);

    return (
        <div className="flex flex-col h-full justify-between px-4">
            <div
                style={{ height: "100%", maxHeight: "500px" }}
                className="overflow-auto px-2 mt-3"
            >
                {loading ? (
                    <span className="loading loading-spinner"></span>
                ) : (
                    messages?.map((message) => (
                        <div key={message._id} ref={lastMessage}>
                            <Message
                                key={message._id}
                                sender={authUser}
                                receiver={selectedRoom}
                                message={message}
                            />
                        </div>
                    ))
                )}
            </div>
            <div className="mb-3 w-full flex justify-center items-center">
                <label className="w-full input input-bordered flex items-center gap-2">
                    <input
                        type="text"
                        className="grow"
                        placeholder="Search"
                        value={message}
                        disabled={loading}
                        onChange={(e: any) => {
                            setMessage(e.target.value);
                        }}
                        onKeyDown={(e: any) => {
                            if (e.key === "Enter") {
                                handleSendMessage();
                            } else if (e.key === "Escape") {
                                setMessage("");
                            }
                        }}
                    />
                    <span
                        className="w-10 h-full badge cursor-pointer hover:scale-110"
                        onClick={handleSendMessage}
                    >
                        {loading ? (
                            <span className="loading loading-spinnner" />
                        ) : (
                            <IoSendSharp />
                        )}
                    </span>
                </label>
            </div>
        </div>
    );
};

export default MessageBody;
