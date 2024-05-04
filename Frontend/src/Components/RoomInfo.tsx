import React from "react";
import { useRoomContext } from "../Context/RoomContext";
import { useUserInfoContext } from "../Context/UserInfoPopupContext";
import { convertCreatedAt } from "../utils";
import { CiSquareRemove } from "react-icons/ci";

const RoomInfo = () => {
    const { selectedRoom } = useRoomContext();
    const { userInfoPopup, setUserInfoPopup } = useUserInfoContext();
    if (!userInfoPopup) return;
    else {
        return (
            <div className="absolute inset-0 z-50 flex items-center justify-center backdrop-filter backdrop-blur-2xl">
                <div className="h-full max-h-[500px] w-full max-w-[500px] bg-gray-800 rounded-2xl p-10 flex justify-end">
                    <div className="mt-40 text-xl font-bold">
                        <h2 className="text-3xl font-bolder mb-4">
                            User Information
                        </h2>
                        <p>
                            <span className="font-semibold">Username: </span>{" "}
                            {selectedRoom.username}
                        </p>
                        <p>
                            <span className="font-semibold">Firstname: </span>{" "}
                            {selectedRoom.firstname}
                        </p>
                        <p>
                            <span className="font-semibold">Lastname: </span>{" "}
                            {selectedRoom.lastname}
                        </p>
                        <p>
                            <span className="font-semibold">Email: </span>{" "}
                            {selectedRoom.email}
                        </p>
                        <p>
                            <span className="font-semibold">Created on: </span>{" "}
                            {convertCreatedAt(selectedRoom.createdAt)}
                        </p>
                    </div>
                    <div
                        className="p-5 text-bolder cursor-pointer"
                        onClick={() => {
                            setUserInfoPopup(false);
                        }}
                    >
                        <CiSquareRemove size={45} />
                    </div>
                </div>
            </div>
        );
    }
};

export default RoomInfo;
