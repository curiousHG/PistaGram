import React, { useState } from "react";
import toast from "react-hot-toast";
import { useRoomContext } from "../Context/SelectedRoomContext";

interface SendMessageProps {
    message: string;
}

const useSendMessage = () => {
    const [loading, setLoading] = useState(false);
    const { selectedRoom } = useRoomContext();

    const sendMessage = async ({ message }: SendMessageProps) => {
        setLoading(true);

        try {
            const res = await fetch(`/api/messages/send/${selectedRoom._id}`, {
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
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { loading, sendMessage };
};

export default useSendMessage;
