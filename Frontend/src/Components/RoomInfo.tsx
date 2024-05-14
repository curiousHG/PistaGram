import { useRoomContext } from "../Context/RoomContext";
import { useUserInfoContext } from "../Context/UserInfoPopupContext";
import { convertCreatedAt } from "../utils";
import { CiSquareRemove } from "react-icons/ci";
import { MdOutlineInfo } from "react-icons/md";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { BsFillCalendarDateFill } from "react-icons/bs";
import { MdOutlineGroupAdd } from "react-icons/md";
import { MdGroupRemove } from "react-icons/md";
import useRequest from "../Hooks/useRequest";
import { useEffect, useState } from "react";
import { FaUserClock } from "react-icons/fa6";
import toast from "react-hot-toast";
import useFriends from "../Hooks/useFriends";
import { useSocketContext } from "../Context/SocketContext";
import { IUser } from "../interfaces";

const RoomInfo = () => {
    // State
    const { userInfoPopup, setUserInfoPopup } = useUserInfoContext();
    const [friendStatus, setFriendStatus] = useState("Not Friends");
    // Context
    const { selectedRoom } = useRoomContext();
    const { socket } = useSocketContext();
    // Hooks
    const { loading, getRequestStatus, sendRequest, deleteRequest } =
        useRequest();
    const { removeFriend } = useFriends();

    const handleAddFriend = async () => {
        const requestStatus = await sendRequest(selectedRoom);
        if (requestStatus) {
            toast.success("Request sent sucessfully!!");
            setFriendStatus("Pending");
        } else {
            toast.error("Cannot send friend request!");
        }
    };

    const handleRemoveRequest = async () => {
        const requestRemoved = await deleteRequest(selectedRoom);
        if (requestRemoved) {
            toast.success("Request removed sucessfully!!");
            setFriendStatus("Not Friends");
        } else {
            toast.error("Cannot remove request!");
        }
    };

    const handleRemoveFriend = async () => {
        const friendRemoved = await removeFriend();
        if (friendRemoved) {
            toast.success("Friend Removed successfully!");
            setFriendStatus("Not Friends");
        } else {
            toast.error("Cannot remove friend!");
        }
    };

    // Normal use effects
    useEffect(() => {
        (async () => {
            const status = await getRequestStatus(selectedRoom);
            setFriendStatus(status);
        })();
    }, [selectedRoom, friendStatus]);

    // Socket
    useEffect(() => {
        socket?.on("friendRequestSent", (receiver: IUser) => {
            if (selectedRoom && selectedRoom._id === receiver._id) {
                setFriendStatus("Pending");
            }
        });

        return () => socket?.off("friendRequestSent");
    }, [socket, friendStatus]);

    useEffect(() => {
        socket?.on("requestRemoval", (receiver: IUser) => {
            if (selectedRoom && selectedRoom._id === receiver._id) {
                setFriendStatus("Not Friends");
            }
        });

        return () => socket?.off("requestRemoval");
    }, [socket, friendStatus]);

    useEffect(() => {
        socket?.on("requestAccepted", (receiver: IUser) => {
            if (selectedRoom && selectedRoom._id === receiver._id) {
                setFriendStatus("Friends");
            }
        });
        return () => socket?.off("requestAccepted");
    }, [socket, friendStatus]);

    useEffect(() => {
        socket?.on("acceptRequest", (sender: IUser) => {
            if (selectedRoom && selectedRoom._id === sender._id) {
                setFriendStatus("Friends");
            }
        });

        return () => socket?.off("acceptRequest");
    }, [socket, friendStatus]);

    useEffect(() => {
        socket?.on("requestRejected", (receiver: IUser) => {
            if (selectedRoom && selectedRoom._id === receiver._id) {
                setFriendStatus("Not Friends");
            }
        });

        return () => socket?.off("requestRejected");
    }, [socket, friendStatus]);

    useEffect(() => {
        socket?.on("rejectRequest", (sender: IUser) => {
            if (selectedRoom && selectedRoom._id === sender._id) {
                setFriendStatus("Not Friends");
            }
        });

        return () => socket?.off("rejectRequest");
    }, [socket, friendStatus]);

    useEffect(() => {
        socket?.on("removeFriend", (friend: IUser) => {
            if (selectedRoom && selectedRoom._id === friend._id) {
                setFriendStatus("Not Friends");
            }
        });

        return () => socket?.off("removeFriend");
    }, [socket, friendStatus]);

    if (!userInfoPopup) return;
    else {
        return (
            <div className="absolute inset-0 z-50 flex items-center justify-center backdrop-filter backdrop-blur-2xl">
                <div className="h-full max-h-[500px] w-full max-w-[500px] bg-gray-800 rounded-2xl p-5 flex flex-col gap-4">
                    <div className="text-lg font-bold w-full flex flex-col gap-4 items-center py-2 px-5">
                        <div className="w-full flex justify-between">
                            <p className="text-2xl text-bolder">User Info</p>
                            <div
                                className="pl-8 text-bolder cursor-pointer w-[50px]"
                                onClick={() => {
                                    setUserInfoPopup(false);
                                }}
                            >
                                <CiSquareRemove size={50} />
                            </div>
                        </div>
                        <div className="w-full flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <img
                                    className="w-20 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 cursor-pointer"
                                    src={selectedRoom.profilePicture}
                                    alt="Avatar for user"
                                />
                                <p className="text-lg text-bolder">
                                    {selectedRoom.firstname}{" "}
                                    {selectedRoom.lastname}
                                </p>
                            </div>
                            <p className="p-3 cursor-pointer rounded-full hover:bg-gray-500 hover:scale-110">
                                {loading ? (
                                    <span className="text-center loading loading-spinner loading-xl"></span>
                                ) : friendStatus === "Not Friends" ? (
                                    <MdOutlineGroupAdd
                                        size={35}
                                        onClick={() => handleAddFriend()}
                                    />
                                ) : friendStatus === "Pending" ? (
                                    <FaUserClock
                                        size={35}
                                        onClick={() => {
                                            handleRemoveRequest();
                                        }}
                                    />
                                ) : (
                                    <MdGroupRemove
                                        size={35}
                                        onClick={() => {
                                            handleRemoveFriend();
                                        }}
                                    />
                                )}
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-5 py-2 px-5">
                        <MdOutlineInfo size={50} className="cursor-pointer" />
                        <div className="text-lg text-bold">
                            <p> {selectedRoom.username} </p>
                            <p className="text-lg text-bolder"> User ID </p>
                        </div>
                    </div>
                    <div className="flex gap-5 py-2 px-5">
                        <MdOutlineAlternateEmail
                            size={50}
                            className="cursor-pointer"
                        />
                        <div className="text-lg text-bold">
                            <p> {selectedRoom.email} </p>
                            <p className="text-lg text-bolder"> Email </p>
                        </div>
                    </div>
                    <div className="flex gap-5 py-2 px-5">
                        <BsFillCalendarDateFill
                            size={50}
                            className="cursor-pointer"
                        />
                        <div className="text-lg text-bold">
                            <p> {convertCreatedAt(selectedRoom.createdAt)} </p>
                            <p className="text-lg text-bolder"> Created On </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default RoomInfo;
