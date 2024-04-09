import React, { useState } from "react";
import toast from "react-hot-toast";
import { useRoom } from "../Context/RoomContext";
import { SendMessageProps } from "../interfaces";

const useSendMessage = () => {
    const { selectedRoom } = useRoom();
    const [loading, setLoading] = useState(false);

    const sendMessage = async ({ message }: SendMessageProps) => {
        setLoading(true);

        try {
            const res = await fetch(`/api/messages/send/${selectedRoom?._id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ message }),
            });
            const data = await res.json();
            if (data.error) {
                throw new Error(data.error);
            }
            return data;
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { loading, sendMessage };
};

export default useSendMessage;
