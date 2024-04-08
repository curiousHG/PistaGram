import { IoSendSharp } from "react-icons/io5";
import { useAuthContext } from "../Context/AuthContext";
import useRoom from "../Context/SelectedRoomContext";
import Message from "./Message";
import useSendMessage from "../Hooks/useSendMessage";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { IMessage } from "../interfaces";

const DEFAULT_MESSAGES: IMessage[] = [];

const MessageBody = () => {
    const { authUser } = useAuthContext();
    const { selectedRoom } = useRoom();
    const { sendMessage } = useSendMessage();

    // Loading state of the page
    const [loading, setLoading] = useState(false);

    const lastMessage = useRef(null);

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

    useEffect(() => {
        const getMessages = async () => {
            setLoading(true);
            try {
                const res = await fetch(`/api/messages/${selectedRoom._id}`);
                const data = await res.json();
                if (data.error) {
                    throw new Error(data.error);
                }
                setMessages(data);
                lastMessage.current = data[data.length - 1];
                console.log(lastMessage.current);
            } catch (error: any) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };
        getMessages();
    }, [selectedRoom]);

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
                        <Message
                            key={message._id}
                            sender={authUser}
                            receiver={selectedRoom}
                            message={message}
                        />
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
