import { IMessage, IMessageProps } from "../interfaces";
import { convertCreatedAt } from "../utils";
import { MdOutlineDelete } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { VscCheck, VscClose } from "react-icons/vsc";
import { useEffect, useState } from "react";
import useMessage from "../Hooks/useMessage";
import { useSocketContext } from "../Context/SocketContext";

const Message = ({ sender, receiver, message }: IMessageProps) => {
    const [editing, setEditing] = useState(false);
    const [deleted, setDeleted] = useState(false);

    const { socket } = useSocketContext();

    const [messageVar, setMessageVar] = useState(message.message);
    const { loading, deleteMessage, editMessage } = useMessage();

    const senderId = message.senderId;

    let messageClassName = "chat chat-start break-words";
    let btnClassName = "hidden";

    if (senderId === sender._id) {
        messageClassName = "chat chat-end break-words";
        btnClassName = "";
    }

    if (deleted) {
        messageClassName = "hidden " + messageClassName;
    }

    const profilePicture =
        senderId === sender._id
            ? sender.profilePicture
            : receiver.profilePicture;

    const handleFirstBtnClick = async () => {
        if (editing) {
            await editMessage(message._id, messageVar);
            setEditing(false);
        } else {
            setEditing(true);
        }
    };

    const handleSecondBtnClick = async () => {
        if (editing) {
            setMessageVar(message.message);
            setEditing(false);
        } else {
            await deleteMessage(message._id);
            setDeleted(true);
        }
    };

    useEffect(() => {
        socket?.on("deleteMessage", (deletedMessage: IMessage) => {
            if (deletedMessage._id === message._id) {
                setDeleted(true);
            }
        });

        return () => socket?.off("deleteMessage");
    }, [socket, message._id]);

    useEffect(() => {
        socket?.on("editMessage", (changedMessage: IMessage) => {
            if (changedMessage._id === message._id) {
                setMessageVar(changedMessage.message);
            }
        });
        return () => socket?.off("editMessage");
    }, [socket, message._id]);

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
            <div className="chat-bubble text-md hover:scale-110 hover:opacity-100 relative">
                {editing ? (
                    loading ? (
                        <span className="text-center loading loading-spinner loading-xl"></span>
                    ) : (
                        <input
                            value={messageVar}
                            onChange={(e) => {
                                setMessageVar(e.target.value);
                            }}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    handleFirstBtnClick();
                                } else if (e.key === "Escape") {
                                    handleSecondBtnClick();
                                }
                            }}
                        />
                    )
                ) : loading ? (
                    <span className="text-center loading loading-spinner loading-xl"></span>
                ) : (
                    <span>{messageVar}</span>
                )}
            </div>
            <div
                className={`${btnClassName} chat-footer opacity-100 flex space-x-2 justify-center items-center pt-1`}
            >
                <button
                    className="text-md p-2 rounded-lg bg-gray-800 text-white hover:scale-110"
                    onClick={() => {
                        handleFirstBtnClick();
                    }}
                >
                    {editing ? <VscCheck /> : <FiEdit />}
                </button>
                <button
                    className="text-md p-2 rounded-lg bg-gray-800 text-white hover:scale-110"
                    onClick={() => handleSecondBtnClick()}
                >
                    {editing ? <VscClose /> : <MdOutlineDelete size={16} />}
                </button>
            </div>
        </div>
    );
};

export default Message;
