import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const DEFAULT_ROOM_DATA: any[] = [];

const useGetRooms = () => {
    const [loading, setLoading] = useState(false);
    const [roomData, setRoomData] = useState(DEFAULT_ROOM_DATA);

    const getRoomData = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/users");
            const data = await res.json();

            if (data.error) {
                throw new Error(data.error);
            }
            setRoomData(data);
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getRoomData();
    }, []);

    return { loading, roomData };
};

export default useGetRooms;
