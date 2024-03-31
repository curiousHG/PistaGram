import React from "react";
import Message from "./Message";

const MessageBody = () => {
    return (
        <div className="px-4 h-full mb-3 overflow-auto">
            <Message
                avatarUrl="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                username="John Doe"
                message="Fuck you asshole"
                createdAt=" 12:45 am"
                messageType="start"
            />
            <Message
                avatarUrl="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                username="John Doe"
                message="WTF bro"
                createdAt=" 12:45 am"
                messageType="end"
            />
            <Message
                avatarUrl="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                username="John Doe"
                message="Fuck you too"
                createdAt=" 12:45 am"
                messageType="start"
            />
            <Message
                avatarUrl="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                username="John Doe"
                message="Sorry bro"
                createdAt=" 12:45 am"
                messageType="end"
            />
        </div>
    );
};

export default MessageBody;
