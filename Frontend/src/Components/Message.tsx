interface MessageProps {
    avatarUrl: string;
    username: string;
    message: string;
    createdAt: string;
    messageType: string;
}

const Message = ({
    avatarUrl,
    username,
    message,
    createdAt,
    messageType,
}: MessageProps) => {
    const messageClassName = `chat chat-${messageType}`;
    return (
        <div className={messageClassName}>
            <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                    <img
                        alt="Tailwind CSS chat bubble component"
                        src={avatarUrl}
                    />
                </div>
            </div>
            <div className="chat-header">
                {username}
                <time className="text-xs opacity-50">{createdAt}</time>
            </div>
            <div className="chat-bubble">{message}</div>
            <div className="chat-footer opacity-50"></div>
        </div>
    );
};

export default Message;
