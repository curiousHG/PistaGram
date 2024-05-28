import User from "../Models/User.js";
import { LOGGER } from "../server.js";
import Request from "../Models/Request.js";
import { io, getSocketId } from "../socket.js";

export const sendRequest = async (req, res) => {
    try {
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        const sender = await User.findById(senderId);
        const receiver = await User.findById(receiverId);

        LOGGER.info(
            `Send Request controller - Received request to send friend request to User - { _id - ${receiverId} } from User - { _id - ${senderId} }`
        );

        if (!sender) {
            LOGGER.error(
                `Send Request Controller - Sender { _id - ${senderId} } does not exists`
            );
            throw new Error(`Sender { _id - ${senderId} } does not exists`);
        }

        if (!receiver) {
            LOGGER.error(
                `Send Request Controller - Receiver { _id - ${receiverId} } does not exists`
            );
            throw new Error(`Receiver { _id - ${receiverId} } does not exists`);
        }

        // Check for duplicate req.
        const request = await Request.findOne({
            senderId: senderId,
            receiverId: receiverId,
        });

        if (request) {
            LOGGER.error(
                `Send Request Controller - Request between Sender - { _id - ${senderId}} and Receiver { _id - ${receiverId} } already exists`
            );
            throw new Error(
                `Request between Sender - { _id - ${senderId}} and Receiver { _id - ${receiverId} } already exists`
            );
        } else {
            const newRequestData = {
                senderId: senderId,
                receiverId: receiverId,
            };

            const newRequest = new Request(newRequestData);
            if (newRequest) {
                sender.outgoingFriendsReq.push(newRequest._id);
                receiver.incomingFriendsReq.push(newRequest._id);

                await Promise.all([
                    newRequest.save(),
                    sender.save(),
                    receiver.save(),
                ]);

                const receiverSocketId = getSocketId(receiverId);

                if (receiverSocketId) {
                    const senderSocketResult = {
                        _id: sender._id,
                        username: sender.username,
                        firstname: sender.firstname,
                        lastname: sender.lastname,
                        email: sender.email,
                        profilePicture: sender.profilePicture,
                        createdAt: sender.createdAt,
                        updatedAt: sender.updatedAt,
                        status: "pending",
                    };
                    LOGGER.info(
                        `Send Request Controller - Web socket event { name - request:create} sent to Receiver -> { _id - ${receiverId}, username - ${receiver.username} } of friend request`
                    );
                    io.to(receiverSocketId).emit(
                        "request:create",
                        senderSocketResult
                    );
                    LOGGER.info(
                        `Send Request Controller - Receiver -> { _id - ${receiverId}, username - ${receiver.username} } of friend request was notified about friend request from sender - {id - ${senderId} and username - ${sender.username}}`
                    );
                } else {
                    LOGGER.warn(
                        `Send Request Controller - Receiver -> { _id - ${receiverId}, username - ${receiver.username} } does not have an active socket connection!`
                    );
                }

                res.status(201).json({
                    requestSent: true,
                });
            } else {
                LOGGER.error(
                    `Send Request Controller - Request between Sender - { _id - ${senderId}} and Receiver { _id - ${receiverId} } cannot be sent`
                );
                throw new Error(
                    `Request between Sender - { _id - ${senderId}} and Receiver { _id - ${receiverId} } cannot be sent`
                );
            }
        }
    } catch (error) {
        LOGGER.error(
            `Send Request controller - ${error.name} occurred during sending request - ${error.message}`
        );

        res.status(500).json({
            error: `${error.name} occurred during sending request - ${error.message}`,
        });
    }
};

export const deleteReq = async (req, res) => {
    try {
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        LOGGER.info(
            `Delete Request controller - Received request to delete friend request to User - { _id - ${receiverId} } from User - { _id - ${senderId} }`
        );

        const sender = await User.findById(senderId);
        const receiver = await User.findById(receiverId);

        if (!sender) {
            LOGGER.error(
                `Delete Request Controller - Sender { _id - ${senderId} } does not exists`
            );
            throw new Error(`Sender { _id - ${senderId} } does not exists`);
        }

        if (!receiver) {
            LOGGER.error(
                `Delete Request Controller - Receiver { _id - ${receiverId} } does not exists`
            );
            throw new Error(`Receiver { _id - ${receiverId} } does not exists`);
        }

        // Check for request
        const request = await Request.findOne({
            senderId: senderId,
            receiverId: receiverId,
        });

        if (request) {
            const sendersOutReq = sender.outgoingFriendsReq.filter(
                (id) => !id.equals(request._id)
            );
            const receiversInReq = receiver.incomingFriendsReq.filter(
                (id) => !id.equals(request._id)
            );

            sender.outgoingFriendsReq = sendersOutReq;
            receiver.incomingFriendsReq = receiversInReq;

            const deletedReq = await Request.deleteOne({
                senderId: senderId,
                receiverId: receiverId,
            });

            Promise.all([sender.save(), receiver.save()]);

            LOGGER.info(
                `Delete Request - Deleted the request from  User - { _id - ${senderId} } to User - { _id - ${receiverId} }`
            );

            if (deletedReq.acknowledged) {
                const receiverSocketId = getSocketId(receiverId);

                if (receiverSocketId) {
                    const senderSocketResult = {
                        _id: sender._id,
                        username: sender.username,
                        firstname: sender.firstname,
                        lastname: sender.lastname,
                        email: sender.email,
                        profilePicture: sender.profilePicture,
                        createdAt: sender.createdAt,
                        updatedAt: sender.updatedAt,
                        status: "not friends",
                    };
                    LOGGER.info(
                        `Delete Request controller -  Sending deleted request event { name - request:delete} to receiver - { _id - ${receiverId} }`
                    );
                    io.to(receiverSocketId).emit(
                        "request:delete",
                        senderSocketResult
                    );
                    LOGGER.info(
                        `Delete Request controller - Receiver -> {id - ${receiverId} and username - ${receiver.username}} of friend request was notified about removal of request from sender - {id - ${senderId} and username - ${sender.username}}`
                    );
                } else {
                    LOGGER.warn(
                        `Delete Request controller - Receiver -> {id - ${receiverId} and username - ${receiver.username}} does not have an active socket connection!`
                    );
                }

                res.status(200).json({
                    requestRemoved: true,
                });
            } else {
                LOGGER.error(
                    `Delete Request controller -  Cannot delete the request between User - { _id - ${senderId}} and User - { _id - ${receiverId} }`
                );
                
                res.status(200).json({
                    requestRemoved: false,
                });
            }
        } else {
            LOGGER.error(
                `Delete Request Controller - Request between Sender - { _id - ${senderId}} and Receiver { _id - ${receiverId} } cannot be deleted`
            );
            throw new Error(
                `Request between Sender - { _id - ${senderId}} and Receiver { _id - ${receiverId} } cannot be deleted`
            );
        }
    } catch (error) {
        LOGGER.error(
            `Delete Request controller - ${error.name} occurred during deleting request - ${error.message}`
        );

        res.status(500).json({
            error: `${error.name} occurred during deleting request - ${error.message}`,
        });
    }
};

export const getRequestStatus = async (req, res) => {
    try {
        const { id: receiverId } = req.params;
        const userId = req.user._id;
        const user = await User.findById(userId);

        LOGGER.info(
            `Get Request Status controller - Received request to get request status between User - { _id - ${receiverId} } and User - { _id - ${userId} }`
        );

        if (user) {
            const friends = user.friends;
            const acceptedReceiversId = friends.find((id) =>
                id.equals(receiverId)
            );
            if (acceptedReceiversId) {
                LOGGER.info(
                    `Get Request Status controller - Request between User - { _id - ${receiverId} } and User - { _id -${userId} } does not exists, status is friends`
                );

                res.status(200).json({
                    relStatus: "Friends",
                });
            } else {
                const request =
                    (await Request.findOne({
                        senderId: userId,
                        receiverId: receiverId,
                    })) ||
                    (await Request.findOne({
                        senderId: receiverId,
                        receiverId: userId,
                    }));

                LOGGER.debug(
                    `Get Request Status controller - Request between User - { _id - ${receiverId} } and User - { _id -${userId} } exists, status could be pending or not friends`
                );

                if (request) {
                    res.status(200).json({
                        relStatus: "Pending",
                    });
                } else {
                    res.status(200).json({
                        relStatus: "Not Friends",
                    });
                }
            }
        } else {
            LOGGER.error(
                `Get Request Status controller - User { _id - ${userId}} does not exists`
            );
            throw new Error(`User { _id - ${userId}} does not exists`);
        }
    } catch (error) {
        LOGGER.error(
            `Get Request Status controller - ${error.name} occurred during getting request status - ${error.message}`
        );

        res.status(500).json({
            error: `${error.name} occurred during getting request status - ${error.message}`,
        });
    }
};
