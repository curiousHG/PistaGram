import { useRoomContext } from "../Context/RoomContext";
import { GiHamburgerMenu } from "react-icons/gi";
import { useSidebarContext } from "../Context/SidebarContext";
import { CiSquareRemove } from "react-icons/ci";
import { useUserInfoContext } from "../Context/UserInfoPopupContext";
import { useEffect } from "react";

const ReceiverInfo = () => {
    const { selectedRoom, setSelectedRoom } = useRoomContext();
    const { sidebarOpen, setSidebarOpen } = useSidebarContext();
    const { setUserInfoPopup } = useUserInfoContext();

    const handleHamburgerClick = () => {
        if (!sidebarOpen) {
            setSidebarOpen(!sidebarOpen);
        }
    };

    const handleClearIconClick = () => {
        setSelectedRoom(null);
    };

    const handleUserInfoClick = () => {
        setUserInfoPopup(true);
    };

    // Clean up to remove user Info popup
    useEffect(() => {
        return setUserInfoPopup(false);
    }, []);

    return (
        <div className="w-full flex flex-row justify-between bg-gray-800 items-center rounded-3xl px-2">
            <div className="flex items-center xs:w-[80%]">
                <div
                    className="hidden xs:block p-5"
                    onClick={() => handleHamburgerClick()}
                >
                    <GiHamburgerMenu size={20} />
                </div>
                <div className="avatar py-5 px-5 xs:px-1">
                    <div
                        className="w-14 xs:w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 cursor-pointer"
                        onClick={handleUserInfoClick}
                    >
                        <img
                            src={selectedRoom.profilePicture}
                            alt="user avatar"
                        />
                    </div>
                </div>
                <p
                    className="font-bold text-xl xs:text-lg text-gray-200 cursor-pointer break-words w-full"
                    onClick={handleUserInfoClick}
                >
                    {selectedRoom.username}
                </p>
            </div>
            <div
                className="p-5 cursor-pointer"
                onClick={() => {
                    handleClearIconClick();
                }}
            >
                <CiSquareRemove size={25} />
            </div>
        </div>
    );
};

export default ReceiverInfo;
