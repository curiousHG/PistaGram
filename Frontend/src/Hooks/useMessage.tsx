import { useState } from "react";
import toast from "react-hot-toast";
import { SendMessageProps } from "../interfaces";
import { useRoomContext } from "../Context/RoomContext";

const useMessage = () => {
    const { selectedRoom } = useRoomContext();
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

    const deleteMessage = async (messageId: string) => {
        setLoading(true);
        try {
            const res = await fetch(`/api/messages/${messageId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
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

    const editMessage = async (messageId: string, newMessage: string) => {
        setLoading(true);
        try {
            const res = await fetch(`/api/messages/${messageId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    newMessage: newMessage,
                }),
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

    return { loading, sendMessage, deleteMessage, editMessage };
};

export default useMessage;
