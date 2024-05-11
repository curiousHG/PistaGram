import Message from "../Models/Message.js";
import Room from "../Models/Room.js";
import { getReceiverSocketId, io } from "../socket.js";

export const addMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;
        let room = await Room.findOne({
            people: { $all: [senderId, receiverId] },
        });

        if (!room) {
            room = await Room.create({
                people: [senderId, receiverId],
            });
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message,
        });

        if (!newMessage) {
            return res.status(400).json({
                error: "Internal Server error while creating new message!",
            });
        }

        room.messages.push(newMessage._id);
        room.lastUpdated = new Date().getTime();

        await Promise.all([newMessage.save(), room.save()]);

        const receiverSocketId = getReceiverSocketId(receiverId);

        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }

        return res.status(201).json(newMessage);
    } catch (error) {
        console.log("Error in Register Message Controller: ", error.message);
        res.status(500).json({
            error: "Server Error: Internal error occurred during message registering!",
        });
    }
};

export const getMessages = async (req, res) => {
    try {
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        const room = await Room.findOne({
            people: { $all: [senderId, receiverId] },
        }).populate("messages");

        if (!room) {
            return res.status(200).json([]);
        }
        const messages = room.messages;

        return res.status(200).json(messages);
    } catch (error) {
        console.log("Error in Get Message Controller: ", error.message);
        res.status(500).json({
            error: "Server Error: Internal error occurred during message gathering!",
        });
    }
};

export const deleteMessage = async (req, res) => {
    try {
        const { id: messageId } = req.params;
        const senderId = req.user._id;

        const message = await Message.findById(messageId);
        if (!message) {
            throw new Error("Message does not exists!");
        }

        const messageSenderId = message.senderId;
        if (messageSenderId.equals(senderId)) {
            const deletedMessage = await Message.findOneAndDelete({
                senderId: senderId,
            });

            if (deleteMessage) return res.status(200).json(deletedMessage);
            else {
                throw new Error(
                    "Message not found in database! Refresh the page.."
                );
            }
        } else {
            throw new Error("Message does not belongs to the current user!!");
        }
    } catch (error) {
        console.log("Error in Delete Message Controller: ", error.message);
        res.status(500).json({
            error: "Server: Error Internal error occurred during message deletion!",
            message: error.message,
        });
    }
};
