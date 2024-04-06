import ReceiverInfo from "./ReceiverInfo.js";
import MessageBody from "./MessageBody.js";
import MessageInput from "./MessageInput.js";
import { TiMessages } from "react-icons/ti";

interface MessageContainerProps {
    room: any;
    defaultView: boolean;
}

const MessageContainer = ({ room, defaultView }: MessageContainerProps) => {
    const DefaultViewJSX = () => {
        return (
            <div className="flex items-center justify-center w-full h-full">
                <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
                    <p> Welcome John Doe</p>
                    <p> Select a room to view chat history</p>
                    <TiMessages className="text-3xl" />
                </div>
            </div>
        );
    };

    const RoomViewJSX = () => {
        return (
            <div className="flex flex-col justify-between bg-white-400 m-3 w-full rounded-3xl">
                <ReceiverInfo room={room} />
                <MessageBody />
                <MessageInput />
            </div>
        );
    };

    return defaultView ? <DefaultViewJSX /> : <RoomViewJSX />;
};

export default MessageContainer;
