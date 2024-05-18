import { useEffect, useState } from "react";
import { useSearchBoxContext } from "../Context/SearchBoxContext";
import useRooms from "../Hooks/useRoom";
import Room from "./Room";
import { useRoomContext } from "../Context/RoomContext";
const Rooms = () => {
    const { category, selectedRoom, setSelectedRoom } = useRoomContext();
    const { searchBox } = useSearchBoxContext();
    const { loading, roomData, setRoomData } = useRooms(category);
    const [filteredRoomData, setFilteredRoomData] = useState(roomData);

    console.log("RoomData", roomData);

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

    const updateRoomData = (roomId: string, changedStatus: string) => {
        setRoomData((prevRoomData) =>
            prevRoomData.map((room) =>
                room._id === roomId ? { ...room, status: changedStatus } : room
            )
        );

        const prevRoom = roomData.find((room) => room._id === roomId);
        const updatedRoom = { ...prevRoom, status: changedStatus };
        if (selectedRoom && updatedRoom) {
            setSelectedRoom(updatedRoom);
        }
    };

    const justifyStyle =
        filteredRoomData.length === 0 ? "justify-center" : "justify-start";

    return (
        <div
            className={`overflow-x-hidden flex flex-col ${justifyStyle} h-full`}
        >
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
                        updateRoomData={updateRoomData}
                    />
                ))
            )}
        </div>
    );
};

export default Rooms;
