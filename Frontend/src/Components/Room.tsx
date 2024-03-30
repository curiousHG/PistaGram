import React from "react";

interface UserSidebarInfo {
    username: string;
    avatarUrl: string;
}

const Room = ({ username, avatarUrl }: UserSidebarInfo) => {
    return (
        <div className="flex flex-col gap-2 w-full px-2 my-2">
            <div className="flex gap-4 items-center hover:bg-gray-500 rounded p-3 py-2 cursor-pointer">
                <div className="avatar online">
                    <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                        <img src={avatarUrl} alt="user avatar" />
                    </div>
                </div>
                <div className="flex flex-col flex-1">
                    <p className="font-semibold text-gray-200">{username}</p>
                </div>
            </div>
            <div className="divider my-0 py-0 h-1"></div>
        </div>
    );
};

export default Room;
