import ReceiverInfo from "./ReceiverInfo.js";
import MessageBody from "./MessageBody.js";
import { TiMessages } from "react-icons/ti";
import { useAuthContext } from "../Context/AuthContext.js";
import { useRoom } from "../Context/RoomContext.js";
import { useEffect, useState } from "react";
import { useSidebarContext } from "../Context/SidebarContext.js";
import { GiHamburgerMenu } from "react-icons/gi";

const MessageContainer = () => {
    const { authUser } = useAuthContext();
    const { sidebarOpen, setSidebarOpen } = useSidebarContext();
    const { selectedRoom, setSelectedRoom } = useRoom();
    const [showBorder, setShowBorder] = useState(true);

    const handleHamburgerClick = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const handleOutsideClick = () => {
        if (sidebarOpen) {
            setSidebarOpen(!sidebarOpen);
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowBorder(false);
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        return () => setSelectedRoom(null);
    }, [setSelectedRoom]);

    const DefaultViewJSX = () => {
        return (
            <div
                className="w-full"
                onClick={() => {
                    handleOutsideClick();
                }}
            >
                <div
                    className={`relative ${
                        showBorder ? "border-gradient" : ""
                    }`}
                    onClick={() => handleHamburgerClick()}
                >
                    <div className="hidden xs:block p-5">
                        <GiHamburgerMenu size={30} />
                    </div>
                </div>
                <div className="flex items-center justify-center w-full h-full">
                    <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
                        <p>
                            {" "}
                            Welcome{"  "}
                            <span className="text-black text-3xl">
                                {authUser.username}
                            </span>
                        </p>
                        <p> Select a room to view chat history </p>
                        <div className="text-7xl">
                            <TiMessages />
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const RoomViewJSX = () => {
        return (
            <div
                className="h-full w-full flex flex-col justify-evenly bg-white-400 p-4 rounded-3xl"
                onClick={() => {
                    handleOutsideClick();
                }}
            >
                <ReceiverInfo />
                <MessageBody />
            </div>
        );
    };
    return selectedRoom === null ? <DefaultViewJSX /> : <RoomViewJSX />;
};

export default MessageContainer;
