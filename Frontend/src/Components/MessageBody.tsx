import { useAuthContext } from "../Context/AuthContext";

const MessageBody = () => {
    const { authUser } = useAuthContext();

    return (
        <div className="px-4 h-full mb-3 overflow-auto">
            {/* {roomMessages?.map((message) => (
                <Message
                    key={message._id}
                    sender={authUser}
                    receiver={selectedRoom}
                    message={message}
                />
            ))} */}
        </div>
    );
};

export default MessageBody;
