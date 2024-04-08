import { IMessageProps } from "../interfaces";
import { convertCreatedAt } from "../utils";

const Message = ({ sender, receiver, message }: IMessageProps) => {
    const senderId = message.senderId;
    let messageClassName = "chat chat-start break-words";
    if (senderId === sender._id) {
        messageClassName = "chat chat-end break-words";
    }
    const profilePicture =
        senderId === sender._id
            ? sender.profilePicture
            : receiver.profilePicture;
    const username =
        senderId === sender._id ? sender.username : receiver.username;

    return (
        <div className={messageClassName}>
            <div className="chat-image avatar">
                <div className="w-10 rounded-full cursor-pointer">
                    <img alt="User Avatar Here!!" src={profilePicture} />
                </div>
            </div>
            <div className="chat-header">
                <time className="text-xs opacity-50">
                    {convertCreatedAt(message.createdAt)}
                </time>
            </div>
            <div className="chat-bubble hover:scale-110">{message.message}</div>
            <div className="chat-footer opacity-50">Delivered</div>
        </div>
    );
};

export default Message;
