import useGetRooms from "../Hooks/useGetRooms";
import Room from "./Room";

const Rooms = () => {
    const { loading, roomData } = useGetRooms();
    return (
        <div className="overflow-x-hidden">
            {loading ? (
                <span className="text-center loading loading-spinner loading-xl"></span>
            ) : (
                roomData.map((room, index) => (
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
