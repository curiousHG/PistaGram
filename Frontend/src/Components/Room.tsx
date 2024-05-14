import { useEffect, useState } from "react";
import { useRoomContext } from "../Context/RoomContext";
import { useSidebarContext } from "../Context/SidebarContext";
import { useSocketContext } from "../Context/SocketContext";
import useFriends from "../Hooks/useFriends";
import { IUser, UserSidebarInfo } from "../interfaces";
import { VscCheck, VscClose } from "react-icons/vsc";
import toast from "react-hot-toast";
import { MdOutlineGroupAdd } from "react-icons/md";
import { FaUserClock } from "react-icons/fa6";
import useRequest from "../Hooks/useRequest";

const Room = ({ room, lastIndex, category }: UserSidebarInfo) => {
    // States
    const [pending, setPending] = useState(true);
    const [friendStatus, setFriendStatus] = useState("Not Friends");

    // Contexts
    const { socket, onlineUsers } = useSocketContext();
    const { selectedRoom, setSelectedRoom } = useRoomContext();
    const { sidebarOpen, setSidebarOpen } = useSidebarContext();

    // Hooks
    const { loading, acceptFriendReq, rejectFriendReq } = useFriends();
    const {
        loading: requestStatusLoading,
        getRequestStatus,
        sendRequest,
        deleteRequest,
    } = useRequest();

    const handleRoomClick = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const handleAddFriend = async () => {
        const requestStatus = await sendRequest(room);
        if (requestStatus) {
            toast.success("Request sent sucessfully!!");
            setFriendStatus("Pending");
        } else {
            toast.error("Cannot send friend request!");
        }
    };

    const handleRemoveRequest = async () => {
        const requestRemoved = await deleteRequest(room);
        if (requestRemoved) {
            toast.success("Request removed sucessfully!!");
            setFriendStatus("Not Friends");
        } else {
            toast.error("Cannot remove request!");
        }
    };

    const handleAcceptReq = async () => {
        const accepted = await acceptFriendReq(room);
        if (accepted) {
            toast.success("Friend request accepted!");
            setPending(false);
        } else {
            toast.error("Cannot accept this friend request!");
        }
    };

    const handleRejectReq = async () => {
        const rejected = await rejectFriendReq(room);

        if (rejected) {
            toast.success("Friend request rejected!");
            setPending(false);
        } else {
            toast.error("Cannot reject this friend request!");
        }
    };

    // Normal use effects
    useEffect(() => {
        (async () => {
            const status = await getRequestStatus(room);
            setFriendStatus(status);
        })();
    }, []);

    //Socket use effects
    useEffect(() => {
        socket?.on("friendRequestSent", (receiver: IUser) => {
            if (room && room._id === receiver._id) {
                setFriendStatus("Pending");
                setPending(true);
            }
        });

        return () => socket?.off("friendRequestSent");
    }, [socket, friendStatus, pending]);

    useEffect(() => {
        socket?.on("requestRemoval", (receiver: IUser) => {
            if (room && room._id === receiver._id) {
                setFriendStatus("Not Friends");
                setPending(true);
            }
        });

        return () => socket?.off("requestRemoval");
    }, [socket, friendStatus, pending]);

    useEffect(() => {
        socket?.on("requestRejected", (receiver: IUser) => {
            if (room && room._id === receiver._id) {
                setFriendStatus("Not Friends");
                setPending(true);
                toast.error(
                    `Friend request sent by you was rejected by ${receiver.username}`
                );
            }
        });

        return () => socket?.off("requestRejected");
    }, [socket, friendStatus, pending]);

    useEffect(() => {
        socket?.on("removeFriend", (friend: IUser) => {
            if (room && room._id === friend._id) {
                setFriendStatus("Not Friends");
                setPending(true);
            }
        });

        return () => socket?.off("removeFriend");
    }, [socket, friendStatus, pending]);

    const isSelected: boolean = selectedRoom?._id === room._id;

    const selectedStyle: string = isSelected
        ? "bg-gray-500 scale-110"
        : "hover:bg-gray-500 hover:scale-110";
    const hiddenStyle: string = pending ? "" : "hidden";
    const loaderStyle: string = loading ? "justify-center" : "";
    const className: string = `flex flex-col gap-2 px-2 my-2 ${selectedStyle} ${hiddenStyle} ${loaderStyle}`;
    const onlineStatus = onlineUsers.includes(room._id)
        ? "avatar online"
        : "avatar";

    return (
        <div
            className={className}
            onClick={() => {
                setSelectedRoom(room);
                if (sidebarOpen) {
                    handleRoomClick();
                }
            }}
        >
            {loading ? (
                <span className="text-center loading loading-spinner loading-xl h-[80px] p-5"></span>
            ) : (
                <div>
                    <div className="flex flex-wrap gap-4 items-center rounded p-3 py-2 cursor-pointer">
                        <div className={onlineStatus}>
                            <div className="w-14 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                <img
                                    src={room.profilePicture}
                                    alt="user avatar"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col flex-1 flex-wrap w-full max-w-[120px]">
                            <p className="font-semibold text-gray-200">
                                {room.username}
                            </p>
                        </div>
                        {category === "pending" ? (
                            <div className="flex gap-1 items-center">
                                <button
                                    className="text-xs p-1 rounded-lg bg-gray-800 text-white hover:scale-110 hover:bg-gray-600"
                                    onClick={() => {
                                        handleAcceptReq();
                                    }}
                                >
                                    <VscCheck size={20} />
                                </button>

                                <button
                                    className="text-xs p-1 rounded-lg bg-gray-800 text-white hover:scale-110 hover:bg-gray-600"
                                    onClick={() => {
                                        handleRejectReq();
                                    }}
                                >
                                    <VscClose size={20} />
                                </button>
                            </div>
                        ) : null}

                        {category === "discover" ? (
                            <p className="p-3 cursor-pointer rounded-full hover:bg-gray-500 hover:scale-110">
                                {requestStatusLoading ? (
                                    <span className="text-center loading loading-spinner loading-xl"></span>
                                ) : friendStatus === "Not Friends" ? (
                                    <MdOutlineGroupAdd
                                        size={35}
                                        onClick={() => handleAddFriend()}
                                    />
                                ) : (
                                    <FaUserClock
                                        size={35}
                                        onClick={() => {
                                            handleRemoveRequest();
                                        }}
                                    />
                                )}
                            </p>
                        ) : null}
                    </div>
                    {!lastIndex ? (
                        <div className="divider my-0 py-0 h-1"></div>
                    ) : null}
                </div>
            )}
        </div>
    );
};

export default Room;
