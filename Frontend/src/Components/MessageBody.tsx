import { useAuthContext } from "../Context/AuthContext";
import useRoom from "../Context/SelectedRoomContext";
import Message from "./Message";
import useGetMessages from "../Hooks/useGetMessages";

const MessageBody = () => {
    const { authUser } = useAuthContext();
    const { selectedRoom } = useRoom();

    const { loading, messages } = useGetMessages();

    return (
        <div className="px-4 h-full mb-3 overflow-auto scroll-bottom">
            {loading ? (
                <span className="loading loading-spinner"></span>
            ) : (
                messages?.map((message) => (
                    <Message
                        key={message._id}
                        sender={authUser}
                        receiver={selectedRoom}
                        message={message}
                    />
                ))
            )}
        </div>
    );
};

export default MessageBody;
