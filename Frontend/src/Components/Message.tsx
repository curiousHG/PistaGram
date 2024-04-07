interface MessageProps {
    sender: any;
    receiver: any;
    message: any;
}

const Message = ({ sender, receiver, message }: MessageProps) => {
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

    const format = (value: number): string => {
        if (value < 10) return "0" + value.toString();
        else {
            return value.toString();
        }
    };

    const convertCreatedAt = (timezone: string) => {
        const dateTime = new Date(timezone);
        return (
            format(dateTime.getDate()) +
            "/" +
            format(dateTime.getMonth() + 1) +
            "/" +
            format(dateTime.getFullYear()) +
            " " +
            format(dateTime.getHours()) +
            ":" +
            format(dateTime.getMinutes())
        );
    };

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
            <div className="chat-bubble">{message.message}</div>
            <div className="chat-footer opacity-50">Delivered</div>
        </div>
    );
};

export default Message;
