import Message from "../Models/Message.js";
import Room from "../Models/Room.js";
import { LOGGER } from "../server.js";
import { getSocketId, io } from "../socket.js";

export const addMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        LOGGER.info(
            `Add Message controller - Received request to add message to User - { _id - ${receiverId}} from Sender - { _id - ${senderId} }`
        );

        let room = await Room.findOne({
            people: { $all: [senderId, receiverId] },
        });

        if (!room) {
            LOGGER.info(
                `Add Message controller - No room found between User - { _id - ${senderId}} } and User - { _id - ${receiverId} }, Making one room`
            );
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
            LOGGER.error(
                `Add Message controller - Cannot make message object from User - { _id - ${senderId} } to User - { _id - ${receiverId} }`
            );
            throw new Error(
                `Cannot send message from User - { _id - ${senderId} } to User - { _id - ${receiverId} }`
            );
        }

        room.messages.push(newMessage._id);
        room.lastUpdated = new Date().getTime();

        await Promise.all([newMessage.save(), room.save()]);

        const receiverSocketId = getSocketId(receiverId);

        if (receiverSocketId) {
            LOGGER.info(
                `Add Message controller - Sending socket event - { name - newMessage } back to Receiver { _id - ${receiverId}, socketId - ${receiverSocketId}} of the message`
            );
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }

        return res.status(201).json(newMessage);
    } catch (error) {
        LOGGER.error(
            `Add Message controller - ${error.name} occurred during sending message - ${error.message}`
        );

        res.status(500).json({
            error: `${error.name} occurred during sending message - ${error.message}`,
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
            LOGGER.error(
                `Get Message controller - Cannot find a room between User - { _id - ${receiverId}} and User - { _id - ${senderId} }`
            );
            return res.status(200).json([]);
        }
        const messages = room.messages;

        LOGGER.info(
            `Get Message controller - Sent all the messages between User - { _id - ${receiverId}} and User - { _id - ${senderId} }`
        );
        return res.status(200).json(messages);
    } catch (error) {
        LOGGER.error(
            `Get Message controller - ${error.name} occurred during getting message - ${error.message}`
        );

        res.status(500).json({
            error: `${error.name} occurred during getting message - ${error.message}`,
        });
    }
};

export const editMessage = async (req, res) => {
    try {
        const { id: messageId } = req.params;
        const senderId = req.user._id;
        const { newMessage } = req.body;

        LOGGER.info(
            `Edit Message controller - Received request to edit message betweeb User - { _id - ${receiverId}} from Sender - { _id - ${senderId} } to ${newMessage}`
        );

        const message = await Message.findById(messageId);
        if (!message) {
            LOGGER.error(
                `Edit Message controller - Cannot find the message between - { _id - ${receiverId}} from Sender - { _id - ${senderId} } that needs to be changed`
            );
            throw new Error(
                `Cannot find the message between - { _id - ${receiverId}} from Sender - { _id - ${senderId} } that needs to be changed`
            );
        }

        const messageSenderId = message.senderId;
        if (messageSenderId.equals(senderId)) {
            const changedMessage = await Message.findByIdAndUpdate(
                messageId,
                {
                    message: newMessage,
                },
                { new: true }
            );
            if (!changedMessage) {
                throw new Error(
                    "Message was not found in database please refresh and try again!"
                );
            }

            const receiverId = message.receiverId;

            const receiverSocketId = getSocketId(receiverId);
            if (receiverSocketId) {
                LOGGER.info(
                    `Edit Message controller - Sending socket event - { name - editMessage } back to Receiver { _id - ${receiverId}, socketId - ${receiverSocketId}} of the message`
                );
                io.to(receiverSocketId).emit("editMessage", changedMessage);
            }

            return res.status(200).json(changedMessage);
        } else {
            LOGGER.error(
                `Edit Message controller - Message does not belong to the User - { _id - ${senderId}}`
            );
            throw new Error(
                `Cannot change a message that does not belongs to you!`
            );
        }
    } catch (error) {
        LOGGER.error(
            `Edit Message controller - ${error.name} occurred during editing message - ${error.message}`
        );

        res.status(500).json({
            error: `${error.name} occurred during editing message - ${error.message}`,
        });
    }
};

export const deleteMessage = async (req, res) => {
    try {
        const { id: messageId } = req.params;
        const senderId = req.user._id;

        const message = await Message.findById(messageId);
        if (!message) {
            LOGGER.error(
                `Delete Message controller - Cannot find message { _id - ${messageId} } from User - { _id - ${senderId}}`
            );
            throw new Error(
                `Cannot find message { _id - ${messageId} } from User - { _id - ${senderId}}`
            );
        }

        const messageSenderId = message.senderId;
        if (messageSenderId.equals(senderId)) {
            const deletedMessage = await Message.findOneAndDelete({
                senderId: senderId,
            });

            const receiverId = message.receiverId;

            const receiverSocketId = getSocketId(receiverId);
            if (receiverSocketId) {
                LOGGER.info(
                    `Delete Message controller - Sending socket event - { name - deleteMessage } back to Receiver { _id - ${receiverId}, socketId - ${receiverSocketId}} of the message`
                );
                io.to(receiverSocketId).emit("deleteMessage", deletedMessage);
            }

            if (deletedMessage) {
                LOGGER.info(
                    `Delete Message controller - Deleted the message { _id - ${messageId}} from User - { _id - ${senderId} }`
                );
                return res.status(200).json(deletedMessage);
            } else {
                LOGGER.error(
                    `Delete Message controller - Cannot delete the message { _id - ${messageId} } from User - { _id - ${senderId}}`
                );
                throw new Error(
                    `Cannot delete the message { _id - ${messageId} } from User - { _id - ${senderId}}`
                );
            }
        } else {
            LOGGER.error(
                `Delete Message controller - Message does not belong to the User - { _id - ${senderId}}`
            );
            throw new Error(
                `Message does not belong to the User - { _id - ${senderId}}`
            );
        }
    } catch (error) {
        LOGGER.error(
            `Delete Message controller - ${error.name} occurred during deleting message - ${error.message}`
        );

        res.status(500).json({
            error: `${error.name} occurred during deleting message - ${error.message}`,
        });
    }
};
