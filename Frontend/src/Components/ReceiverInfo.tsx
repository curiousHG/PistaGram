import { useRoomContext } from "../Context/RoomContext";
import { GiHamburgerMenu } from "react-icons/gi";
import { useSidebarContext } from "../Context/SidebarContext";
import { CiSquareRemove } from "react-icons/ci";

const ReceiverInfo = () => {
    const { selectedRoom, setSelectedRoom } = useRoomContext();
    const { sidebarOpen, setSidebarOpen } = useSidebarContext();

    const handleHamburgerClick = () => {
        if (!sidebarOpen) {
            setSidebarOpen(!sidebarOpen);
        }
    };

    const handleClearIconClick = () => {
        setSelectedRoom(null);
    };

    return (
        <div className="w-full flex flex-row gap-3 bg-gray-800 items-center rounded-3xl">
            <div className="flex items-center">
                <div
                    className="hidden xs:block p-5"
                    onClick={() => handleHamburgerClick()}
                >
                    <GiHamburgerMenu size={30} />
                </div>
                <div className="avatar py-5 px-5 xs:px-1">
                    <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                        <img
                            src={selectedRoom.profilePicture}
                            alt="user avatar"
                        />
                    </div>
                </div>
            </div>
            <div className="flex flex-col flex-1">
                <p className="font-bold text-xl text-gray-200">
                    {selectedRoom.username}
                </p>
            </div>
            <div
                className="p-5 text-bolder"
                onClick={() => {
                    handleClearIconClick();
                }}
            >
                <CiSquareRemove size={35} />
            </div>
        </div>
    );
};

export default ReceiverInfo;
