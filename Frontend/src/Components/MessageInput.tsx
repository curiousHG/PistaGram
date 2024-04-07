import { useState } from "react";
import { IoSendSharp } from "react-icons/io5";
import useSendMessage from "../Hooks/useSendMessage";

const MessageInput = (messages: any, setMessages: any) => {
    const [message, setMessage] = useState("");
    const { loading, sendMessage } = useSendMessage();

    const handleSendMessage = async () => {
        if (message !== "") {
            await sendMessage({ message, messages, setMessages });
            setMessage("");
        }
    };

    return (
        <div className="p-2 w-full flex justify-center items-center">
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
    );
};

export default MessageInput;
