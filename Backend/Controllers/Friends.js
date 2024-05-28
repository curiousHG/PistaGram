import Request from "../Models/Request.js";
import User from "../Models/User.js";
import { LOGGER } from "../server.js";
import { io, getSocketId } from "../socket.js";

export const acceptRequest = async (req, res) => {
    try {
        const { id: senderId } = req.params;
        const receiverId = req.user._id;

        LOGGER.info(
            `Accept Request controller - Received friend request acception request from User - { _id - ${receiverId} } to User - { _id - ${senderId} }`
        );

        const request = await Request.findOne({
            senderId: senderId,
            receiverId: receiverId,
        });

        if (request) {
            LOGGER.info(
                `Accept Request controller - Request from Sender - { _id - ${senderId} } to Receiver - { _id - ${receiverId}} exists`
            );

            const receiver = await User.findById(receiverId);
            if (receiver) {
                const sender = await User.findById(senderId);

                if (sender) {
                    LOGGER.info(
                        `Accept Request controller - Sender-Receiver validation successfull, now processing request further`
                    );
                    // Remove requestId from receiver incoming requests
                    const filteredIncomingReq =
                        receiver.incomingFriendsReq.filter(
                            (id) => !id.equals(request._id)
                        );

                    receiver.incomingFriendsReq = filteredIncomingReq;
                    // Remove requestId from sender outgoing requests

                    const filteredOutgoingReq =
                        sender.outgoingFriendsReq.filter(
                            (id) => !id.equals(request._id)
                        );

                    sender.outgoingFriendsReq = filteredOutgoingReq;

                    const deletedRequest = await Request.deleteOne({
                        senderId: senderId,
                        receiverId: receiverId,
                    });

                    LOGGER.info(
                        `Accept Request controller - Removed request object from sender-receiver friend request entry and deleted request { _id : ${request._id} } from db`
                    );

                    if (deletedRequest.acknowledged) {
                        sender.friends.push(receiverId);
                        receiver.friends.push(senderId);

                        Promise.all([sender.save(), receiver.save()]);

                        const senderSocketId = getSocketId(senderId);

                        LOGGER.info(
                            `Accept Request controller - Accepted friend request from Sender - { _id - ${senderId} } to Receiver - { _id - ${receiverId} }`
                        );

                        if (senderSocketId) {
                            LOGGER.info(
                                `Accept Request controller - Sending socket event - { name - request:accept } back to Sender { _id - ${senderId}, socketId - ${senderSocketId}} of request`
                            );
                            const receiverSocketResult = {
                                _id: receiver._id,
                                username: receiver.username,
                                firstname: receiver.firstname,
                                lastname: receiver.lastname,
                                email: receiver.email,
                                profilePicture: receiver.profilePicture,
                                createdAt: receiver.createdAt,
                                updatedAt: receiver.updatedAt,
                                status: "friends",
                            };
                            io.to(senderSocketId).emit(
                                "request:accept",
                                receiverSocketResult
                            );
                            LOGGER.info(
                                `Accept Request controller - Sender -> { _id - ${receiverId}, username - ${receiver.username}} of friend request was notified about acceptance of friend request from receiver - { _id - ${senderId}, username - ${sender.username}}`
                            );
                        } else {
                            LOGGER.warn(
                                `Accept Request controller - Sender -> { _id - ${receiverId} and username - ${receiver.username}} does not have an active socket connection!`
                            );
                        }

                        res.status(201).json({
                            requestAccepted: true,
                        });
                    } else {
                        LOGGER.error(
                            `Accept Request controller - Friend request acceptance aborte due to cannot remove friend request { _id : ${request.id}}`
                        );
                        throw new Error(
                            `Accept Request request acceptance aborte due to cannot remove friend request { _id : ${request.id}}`
                        );
                    }
                } else {
                    LOGGER.error(
                        `Accept Request controller - Sender { _id - ${senderId} } of Request - { _id - ${request._id} } does not exists`
                    );
                    throw new Error(
                        `Sender { _id - ${senderId} } of Request - { _id - ${request._id} } does not exists`
                    );
                }
            } else {
                LOGGER.error(
                    `Accept Request controller - Receiver { _id - ${receiverId} } of Request - { _id - ${request._id} } does not exists`
                );
                throw new Error(
                    `Receiver { _id - ${receiverId} } of Request - { _id - ${request._id} } does not exists`
                );
            }
        } else {
            LOGGER.error(
                `Accept Request controller - Request from Sender - { _id - ${senderId} } to Receiver - { _id - ${receiverId}} does not exists`
            );

            throw new Error(
                `Request from Sender - { _id - ${senderId} } to Receiver - { _id - ${receiverId}} does not exists`
            );
        }
    } catch (error) {
        LOGGER.error(
            `Accept Request controller - ${error.name} occurred during accepting request - ${error.message}`
        );
        throw new Error({
            error: `${error.name} occurred during accepting request - ${error.message}`,
        });
    }
};

export const rejectRequest = async (req, res) => {
    try {
        const { id: senderId } = req.params;
        const receiverId = req.user._id;

        const request = await Request.findOne({
            senderId: senderId,
            receiverId: receiverId,
        });

        if (request) {
            const receiver = await User.findById(receiverId);
            if (receiver) {
                const sender = await User.findById(senderId);

                if (sender) {
                    // Remove requestId from receiver incoming requests
                    const filteredIncomingReq =
                        receiver.incomingFriendsReq.filter(
                            (id) => !id.equals(request._id)
                        );

                    receiver.incomingFriendsReq = filteredIncomingReq;
                    // Remove requestId from sender outgoing requests

                    const filteredOutgoingReq =
                        sender.outgoingFriendsReq.filter(
                            (id) => !id.equals(request._id)
                        );

                    sender.outgoingFriendsReq = filteredOutgoingReq;

                    const deletedRequest = await Request.deleteOne({
                        senderId: senderId,
                        receiverId: receiverId,
                    });

                    if (deletedRequest.acknowledged) {
                        Promise.all([sender.save(), receiver.save()]);

                        const senderSocketId = getSocketId(senderId);

                        if (senderSocketId) {
                            const receiverSocketResult = {
                                _id: receiver._id,
                                username: receiver.username,
                                firstname: receiver.firstname,
                                lastname: receiver.lastname,
                                email: receiver.email,
                                profilePicture: receiver.profilePicture,
                                createdAt: receiver.createdAt,
                                updatedAt: receiver.updatedAt,
                                status: "not friends",
                            };
                            io.to(senderSocketId).emit(
                                "request:reject",
                                receiverSocketResult
                            );
                            console.log(
                                `Sender -> {id - ${receiverId} and username - ${receiver.username}} of friend request was notified about rejection of friend request from receiver - {id - ${senderId} and username - ${sender.username}}`
                            );
                        } else {
                            console.log(
                                `Sender -> {id - ${receiverId} and username - ${receiver.username}} does not have an active socket connection!`
                            );
                        }

                        res.status(201).json({
                            requestAccepted: true,
                        });
                    } else {
                        throw new Error(
                            "Request cannot be deleted from database!"
                        );
                    }
                } else {
                    throw new Error("Sender was not found in database!");
                }
            } else {
                throw new Error("Receiver was not found in database!");
            }
        } else {
            throw new Error("No request found for receiver");
        }
    } catch (error) {
        LOGGER.error(
            `Reject Request controller - ${error.name} occurred during rejecting request - ${error.message}`
        );
        throw new Error({
            error: `${error.name} occurred during rejecting request - ${error.message}`,
        });
    }
};

export const removeFriend = async (req, res) => {
    try {
        const { id: friendId } = req.params;
        const userId = req.user._id;

        LOGGER.info(
            `Remove Friend controller - Received friend removal request from User - { _id - ${userId} } - User - { _id - ${friendId} }`
        );

        const user = await User.findById(userId);
        const friend = await User.findById(friendId);

        if (user) {
            if (friend) {
                const filteredUsersFriend = user.friends.filter(
                    (id) => !id.equals(friendId)
                );
                user.friends = filteredUsersFriend;

                const filteredFriendsFriend = friend.friends.filter(
                    (id) => !id.equals(userId)
                );
                friend.friends = filteredFriendsFriend;

                Promise.all([user.save(), friend.save()]);

                const friendSocketId = getSocketId(friendId);

                LOGGER.info(
                    `Remove Friend controller - Removed friend status between User - { _id - ${userId} } and User - { _id - ${friendId} }`
                );

                if (friendSocketId) {
                    LOGGER.info(
                        `Remove Friend controller - Sending socket event - { name - friend:remove } back to Friend { _id - ${friendId}, socketId - ${friendSocketId}} of request`
                    );

                    const userSocketResult = {
                        _id: user._id,
                        username: user.username,
                        firstname: user.firstname,
                        lastname: user.lastname,
                        email: user.email,
                        profilePicture: user.profilePicture,
                        createdAt: user.createdAt,
                        updatedAt: user.updatedAt,
                        status: "not friends",
                    };
                    io.to(friendSocketId).emit(
                        "friend:remove",
                        userSocketResult
                    );
                    LOGGER.info(
                        `Remove Friend controller - Friend -> { _id - ${friendId} and username - ${friend.username}} was notified about removal of friendship from user - { _id - ${userId} and username - ${user.username}}`
                    );
                } else {
                    LOGGER.warn(
                        `Remove Friend controller - Friend -> {id - ${friendId} and username - ${friend.username}} does not have an active socket connection!`
                    );
                }

                res.status(200).json({
                    friendRemoved: true,
                });
            } else {
                LOGGER.error(
                    `Remove Friend controller - Friend's { _id - ${friendId} } does not exists`
                );
                throw new Error(
                    `Friend's { _id - ${friendId}} does not exists`
                );
            }
        } else {
            LOGGER.error(
                `Remove Friend controller - User's { _id - ${userId} } does not exists`
            );
            throw new Error(`User's { _id - ${userId} } does not exists`);
        }
    } catch (error) {
        LOGGER.error(
            `Remove Request controller - ${error.name} occurred during removing request - ${error.message}`
        );
        throw new Error({
            error: `${error.name} occurred during removing request - ${error.message}`,
        });
    }
};
