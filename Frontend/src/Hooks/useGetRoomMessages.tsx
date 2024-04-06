import React, { useState } from "react";
import toast from "react-hot-toast";
import { useRoomContext } from "../Context/SelectedRoomContext";

const useGetRoomMessages = () => {
    const [loading, setLoading] = useState(false);
    const { selectedRoom, setSelectedRoomMessages } = useRoomContext();

    const getRoomMessages = async () => {
        setLoading(true);

        try {
            const res = await fetch(`/api/messages/${selectedRoom._id}`);
            const data = await res.json();
            setSelectedRoomMessages(data);
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { loading, getRoomMessages };
};

export default useGetRoomMessages;
