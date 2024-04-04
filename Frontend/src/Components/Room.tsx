import { useSelectedContext } from "../Context/SelectedRoomContext";

interface UserSidebarInfo {
    room: any;
    lastIndex: boolean;
}

const Room = ({ room, lastIndex }: UserSidebarInfo) => {
    const { selectedRoom, setSelectedRoom } = useSelectedContext();
    const isSelected: boolean = selectedRoom?._id === room._id;

    return (
        <div
            className="flex flex-col gap-2 px-2 my-2 hover:scale-110"
            onClick={setSelectedRoom(room)}
        >
            <div className="flex gap-4 items-center hover:bg-gray-500 rounded p-3 py-2 cursor-pointer">
                <div className="avatar online">
                    <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                        <img src={room.profilePicture} alt="user avatar" />
                    </div>
                </div>
                <div className="flex flex-col flex-1">
                    <p className="font-semibold text-gray-200">
                        {room.username}
                    </p>
                </div>
            </div>
            {!lastIndex ? <div className="divider my-0 py-0 h-1"></div> : null}
        </div>
    );
};

export default Room;
