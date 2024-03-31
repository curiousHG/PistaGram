import React from "react";

interface ReceiverInfoProps {
    username: string;
    avatarUrl: string;
}

const ReceiverInfo = ({ username, avatarUrl }: ReceiverInfoProps) => {
    return (
        <div className="w-full flex flex-row gap-3 items-center border rounded-3xl">
            <div className="avatar p-5">
                <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img src={avatarUrl} alt="user avatar" />
                </div>
            </div>
            <div className="flex flex-col flex-1">
                <p className="font-bold text-xl text-gray-200">{username}</p>
            </div>
        </div>
    );
};

export default ReceiverInfo;
