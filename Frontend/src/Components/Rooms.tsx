import { useEffect, useState } from "react";
import { useSearchBoxContext } from "../Context/SearchBoxContext";
import useGetRooms from "../Hooks/useGetRooms";
import Room from "./Room";

const Rooms = () => {
    const { searchBox } = useSearchBoxContext();
    const { loading, roomData } = useGetRooms();
    const [filteredRoomData, setFilteredRoomData] = useState(roomData);

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

    return (
        <div className="overflow-x-hidden mt-3">
            {loading ? (
                <span className="text-center loading loading-spinner loading-xl"></span>
            ) : (
                filteredRoomData.map((room, index) => (
                    <Room
                        key={room._id}
                        room={room}
                        lastIndex={index === roomData.length - 1}
                    />
                ))
            )}
        </div>
    );
};

export default Rooms;
