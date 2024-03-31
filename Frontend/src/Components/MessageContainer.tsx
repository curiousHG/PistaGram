import React from "react";
import ReceiverInfo from "./ReceiverInfo";

const MessageContainer = () => {
    return (
        <div className="flex flex-col bg-white-400 m-3 w-full rounded-3xl border">
            <ReceiverInfo
                username="John Doe"
                avatarUrl="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
            />
            <MessageBody />
            {/* <SendMessage /> */}
        </div>
    );
};

export default MessageContainer;
