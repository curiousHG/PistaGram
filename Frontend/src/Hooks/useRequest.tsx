import { useState } from "react";
import toast from "react-hot-toast";
import { IUser } from "../interfaces";

const useRequest = () => {
    const [loading, setLoading] = useState(false);

    const getRequestStatus = async (room: IUser) => {
        setLoading(true);

        try {
            const res = await fetch(`/api/request/status/${room._id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data = await res.json();
            if (data.error) {
                throw new Error(data.error);
            }
            return data.relStatus;
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const sendRequest = async (room: IUser) => {
        setLoading(true);

        try {
            const res = await fetch(`/api/request/${room._id}`, {
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

    const deleteRequest = async (room: IUser) => {
        setLoading(true);

        try {
            const res = await fetch(`/api/request/${room._id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data = await res.json();
            if (data.error) {
                throw new Error(data.error);
            }
            return data.requestRemoved;
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
        return false;
    };

    return { loading, getRequestStatus, sendRequest, deleteRequest };
};

export default useRequest;
