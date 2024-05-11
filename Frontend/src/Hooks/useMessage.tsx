import { useState } from "react";
import toast from "react-hot-toast";

const useMessage = () => {
    const [loading, setLoading] = useState(false);
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

    return { loading, deleteMessage, editMessage };
};

export default useMessage;
