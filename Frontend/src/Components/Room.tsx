import { useEffect, useState } from "react";
import { useRoomContext } from "../Context/RoomContext";
import { useSidebarContext } from "../Context/SidebarContext";
import { useSocketContext } from "../Context/SocketContext";
import useFriends from "../Hooks/useFriends";
import { UserSidebarInfo } from "../interfaces";
import { VscCheck, VscClose } from "react-icons/vsc";
import toast from "react-hot-toast";
import { MdOutlineGroupAdd } from "react-icons/md";
import { FaUserClock } from "react-icons/fa6";
import useRequest from "../Hooks/useRequest";

const Room = ({ room, lastIndex }: UserSidebarInfo) => {
    const { selectedRoom, setSelectedRoom, category } = useRoomContext();
    const { onlineUsers } = useSocketContext();
    const { sidebarOpen, setSidebarOpen } = useSidebarContext();
    const { loading, acceptFriendReq, rejectFriendReq } = useFriends();
    const [pending, setPending] = useState(true);
    const [friendStatus, setFriendStatus] = useState("Not Friends");

    const {
        loading: requestStatusLaoding,
        getRequestStatus,
        sendRequest,
        deleteRequest,
    } = useRequest();

    useEffect(() => {
        (async () => {
            const status = await getRequestStatus(room);
            setFriendStatus(status);
        })();
    }, []);

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

    const isSelected: boolean = selectedRoom?._id === room._id;

    const handleRoomClick = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const selectedStyle: string = isSelected
        ? "bg-gray-500 scale-110"
        : "hover:bg-gray-500 hover:scale-110";
    const hiddenStyle: string = pending ? "" : "hidden";
    const loaderStyle: string = loading ? "justify-center" : "";
    const className: string = `flex flex-col gap-2 px-2 my-2 ${selectedStyle} ${hiddenStyle} ${loaderStyle}`;
    const onlineStatus = onlineUsers.includes(room._id)
        ? "avatar online"
        : "avatar";

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

    return (
        <div className={className}>
            {loading ? (
                <span className="text-center loading loading-spinner loading-xl h-[80px] p-5"></span>
            ) : (
                <div>
                    <div className="flex flex-row flex-wrap justify-between items-center rounded p-3 py-2 cursor-pointer">
                        <div
                            className="flex flex-row gap-4 items-center"
                            onClick={() => {
                                setSelectedRoom(room);
                                if (sidebarOpen) {
                                    handleRoomClick();
                                }
                            }}
                        >
                            <div className={onlineStatus}>
                                <div className="w-14 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                    <img
                                        src={room.profilePicture}
                                        alt="user avatar"
                                    />
                                </div>
                            </div>
                            <p className="font-semibold text-gray-200 break-words w-[150px] xs:w-[130px]">
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
                                {requestStatusLaoding ? (
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
