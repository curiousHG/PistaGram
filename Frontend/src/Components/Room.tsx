import useRoom from "../Context/SelectedRoomContext";
import { UserSidebarInfo } from "../interfaces";

const Room = ({ room, lastIndex }: UserSidebarInfo) => {
    const { selectedRoom, setSelectedRoom } = useRoom();
    const isSelected: boolean = selectedRoom?._id === room._id;

    const selectedStyle: string = isSelected
        ? "bg-gray-500 scale-110"
        : "hover:bg-gray-500 hover:scale-110";
    const className: string = `flex flex-col gap-2 px-2 my-2 ${selectedStyle} `;

    return (
        <div
            className={className}
            onClick={() => {
                setSelectedRoom(room);
            }}
        >
            <div className="flex gap-4 items-center rounded p-3 py-2 cursor-pointer">
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
