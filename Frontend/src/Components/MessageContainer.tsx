import ReceiverInfo from "./ReceiverInfo.js";
import MessageBody from "./MessageBody.js";
import MessageInput from "./MessageInput.js";

const MessageContainer = () => {
    return (
        <div className="flex flex-col justify-between bg-white-400 m-3 w-full rounded-3xl">
            <ReceiverInfo
                username="John Doe"
                avatarUrl="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
            />
            <MessageBody />
            <MessageInput />
        </div>
    );
};

export default MessageContainer;
