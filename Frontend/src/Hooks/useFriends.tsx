import { useState } from "react";
import toast from "react-hot-toast";
import { IUser } from "../interfaces";

const useFriends = () => {
    const [loading, setLoading] = useState(false);

    const acceptFriendReq = async (room: IUser) => {
        setLoading(true);

        try {
            const res = await fetch(`/api/friends/accept/${room._id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await res.json();
            if (data.error) {
                throw new Error(data.error);
            }
            return true;
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
        return false;
    };

    const rejectFriendReq = async (room: IUser) => {
        setLoading(true);

        try {
            const res = await fetch(`/api/friends/reject/${room._id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await res.json();
            if (data.error) {
                throw new Error(data.error);
            }
            return true;
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
        return false;
    };

    const removeFriend = async (room: IUser) => {
        setLoading(true);

        try {
            const res = await fetch(`/api/friends/${room._id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await res.json();
            if (data.error) {
                throw new Error(data.error);
            }
            return true;
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
        return false;
    };

    return { loading, rejectFriendReq, acceptFriendReq, removeFriend };
};

export default useFriends;
