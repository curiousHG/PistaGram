import React, { useEffect, useReducer, useState } from "react";
import useRoom from "../Context/SelectedRoomContext";
import toast from "react-hot-toast";

const DEFAULT_MESSAGES: any[] = [];

const useGetMessages = () => {
    const [loading, setLoading] = useState(false);
    const { selectedRoom } = useRoom();
    const [messages, setMessages] = useState(DEFAULT_MESSAGES);

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
            } catch (error: any) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };
        getMessages();
    }, []);

    return { loading, messages };
};

export default useGetMessages;
