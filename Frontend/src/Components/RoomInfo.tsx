import { useRoomContext } from "../Context/RoomContext";
import { useUserInfoContext } from "../Context/UserInfoPopupContext";
import { convertCreatedAt } from "../utils";
import { CiSquareRemove } from "react-icons/ci";
import { MdOutlineInfo } from "react-icons/md";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { BsFillCalendarDateFill } from "react-icons/bs";

const RoomInfo = () => {
    const { selectedRoom } = useRoomContext();
    const { userInfoPopup, setUserInfoPopup } = useUserInfoContext();

    if (!userInfoPopup) return;
    else {
        return (
            <div className="absolute inset-0 z-50 flex items-center justify-center backdrop-filter backdrop-blur-2xl">
                <div className="h-full max-h-[500px] w-full max-w-[500px] bg-gray-800 rounded-2xl p-5 flex flex-col gap-4">
                    <div className="text-lg font-bold w-full flex flex-col gap-4 items-center py-2 px-5">
                        <div className="w-full flex justify-between">
                            <p className="text-2xl text-bolder">User Info</p>
                            <div
                                className="pl-8 text-bolder cursor-pointer w-[50px]"
                                onClick={() => {
                                    setUserInfoPopup(false);
                                }}
                            >
                                <CiSquareRemove size={50} />
                            </div>
                        </div>
                        <div className="w-full flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <img
                                    className="w-20 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 cursor-pointer"
                                    src={selectedRoom.profilePicture}
                                    alt="Avatar for user"
                                />
                                <p className="text-lg text-bolder">
                                    {selectedRoom.firstname}{" "}
                                    {selectedRoom.lastname}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-5 py-2 px-5">
                        <MdOutlineInfo size={50} className="cursor-pointer" />
                        <div className="text-lg text-bold">
                            <p> {selectedRoom.username} </p>
                            <p className="text-lg text-bolder"> User ID </p>
                        </div>
                    </div>
                    <div className="flex gap-5 py-2 px-5">
                        <MdOutlineAlternateEmail
                            size={50}
                            className="cursor-pointer"
                        />
                        <div className="text-lg text-bold">
                            <p> {selectedRoom.email} </p>
                            <p className="text-lg text-bolder"> Email </p>
                        </div>
                    </div>
                    <div className="flex gap-5 py-2 px-5">
                        <BsFillCalendarDateFill
                            size={50}
                            className="cursor-pointer"
                        />
                        <div className="text-lg text-bold">
                            <p> {convertCreatedAt(selectedRoom.createdAt)} </p>
                            <p className="text-lg text-bolder"> Created On </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default RoomInfo;
