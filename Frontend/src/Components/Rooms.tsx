import { useEffect, useState } from "react";
import { useSearchBoxContext } from "../Context/SearchBoxContext";
import useRooms from "../Hooks/useRoom";
import Room from "./Room";
import { IRoomsProps, IUser } from "../interfaces";
import { useSocketContext } from "../Context/SocketContext";
import toast from "react-hot-toast";
import { useSidebarContext } from "../Context/SidebarContext";

const Rooms = () => {
    // Context
    const { searchBox } = useSearchBoxContext();
    const { socket } = useSocketContext();
    // Hooks
    const { category } = useSidebarContext();
    const { loading, roomData, setRoomData } = useRooms(category);
    // State
    const [filteredRoomData, setFilteredRoomData] = useState(roomData);

    // Normal UseEffect
    useEffect(() => {
        if (!loading) {
            setFilteredRoomData(roomData);
        }
    }, [loading, roomData]);

    useEffect(() => {
        if (!loading) {
            setFilteredRoomData(
                roomData.filter((room) => room.username.includes(searchBox))
            );
        }
    }, [loading, roomData, searchBox]);

    // Socket Use Effect
    useEffect(() => {
        socket?.on("requestReceived", (sender: IUser) => {
            if (category === "pending") {
                console.log(
                    `New friend request received from ${sender._id} to me`
                );
                if (!roomData.find((user) => user._id === sender._id)) {
                    setRoomData([...roomData, sender]);
                }
            }
            toast.success(
                `New friend request received from ${sender.username}`
            );
        });

        return () => socket?.off("requestReceived");
    }, [socket, roomData]);

    useEffect(() => {
        socket?.on("requestRemovedSucessfully", (sender: IUser) => {
            if (category === "pending") {
                console.log(`Friend Request removed by ${sender.username}`);
                const filteredRoomData = roomData.filter((user) => {
                    return user._id !== sender._id;
                });
                setRoomData(filteredRoomData);
            }
            toast.error(`Friend Request removed by ${sender.username}`);
        });

        return () => socket?.off("requestRemovedSucessfully");
    }, [socket, roomData]);

    useEffect(() => {
        socket?.on("requestAcceptedSuccessfully", (receiver: IUser) => {
            if (category === "friends") {
                console.log(
                    `Friend request sent by you was accepted by ${receiver.username}`
                );
                if (!roomData.find((user) => user._id === receiver._id)) {
                    setRoomData([...roomData, receiver]);
                }
            } else if (category === "discover") {
                const filteredRoomData = roomData.filter((user) => {
                    return user._id !== receiver._id;
                });
                setRoomData(filteredRoomData);
            }
            toast.success(
                `Friend request sent by you was accepted by ${receiver.username}`
            );
        });
        return () => socket?.off("requestAcceptedSuccessfully");
    }, [socket, roomData]);

    useEffect(() => {
        socket?.on("friendRemoved", (friend: IUser) => {
            if (category === "friends") {
                console.log(
                    `You were removed as a friend by ${friend.username}`
                );

                const filteredRoomData = roomData.filter((user) => {
                    return user._id !== friend._id;
                });
                setRoomData(filteredRoomData);
            } else if (category === "discover") {
                if (!roomData.find((user) => user._id === friend._id)) {
                    setRoomData([...roomData, friend]);
                }
            }
            toast.error(`You were removed as a friend by ${friend.username}`);
        });

        return () => socket?.off("friendRemoved");
    }, [socket, roomData]);

    return (
        <div className="overflow-x-hidden mt-3">
            {loading ? (
                <span className="text-center loading loading-spinner loading-xl"></span>
            ) : filteredRoomData.length === 0 ? (
                <div className="text-xl text-bolder text-center">
                    No room in this category!
                </div>
            ) : (
                filteredRoomData.map((room, index) => (
                    <Room
                        key={room._id}
                        room={room}
                        lastIndex={index === roomData.length - 1}
                        category={category}
                    />
                ))
            )}
        </div>
    );
};

export default Rooms;
