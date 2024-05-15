import Request from "../Models/Request.js";
import User from "../Models/User.js";
import { io, getSocketId } from "../socket.js";

export const sendRequest = async (req, res) => {
    try {
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        const sender = await User.findById(senderId).select("-password");
        const receiver = await User.findById(receiverId).select("-password");

        if (!sender) {
            throw new Error("Sender was not found in database! Login Again!");
        }

        if (!receiver) {
            throw new Error("Receiver was not found in database! Refresh");
        }

        // Check for duplicate req.
        const request = await Request.findOne({
            senderId: senderId,
            receiverId: receiverId,
        });

        if (request) {
            throw new Error("Request already exists!!");
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

                console.log(
                    `New friend request received from ${sender.username} to ${receiver.username}`
                );

                const receiverSocketId = getSocketId(receiverId);

                if (receiverSocketId) {
                    io.to(receiverSocketId).emit("newRequestReceived", sender);
                    console.log(
                        `newFriendRequest event emitted to receiver -> ${receiver.username} with socketId -> ${receiverSocketId}`
                    );
                } else {
                    console.log(
                        `Friend Request receiver -> ${receiver.username} was not online!`
                    );
                }

                if (receiverSocketId) {
                    io.to(receiverSocketId).emit("requestReceived", sender);
                    console.log(
                        `requestReceived event emitted to receiver -> ${receiver.username} with socketId -> ${receiverSocketId}`
                    );
                } else {
                    console.log(
                        `Friend Request receiver -> ${receiver.username} was not online!`
                    );
                }

                const senderSocketId = getSocketId(senderId);

                if (senderSocketId) {
                    io.to(senderSocketId).emit("friendRequestSent", receiver);
                    console.log(
                        `friendRequestSent to receiver -> ${receiver.username} by sender -> ${sender.username} with sender's socketId -> ${senderSocketId} `
                    );
                } else {
                    console.log(
                        `Sender -> ${sender.username} of friend request was not online!`
                    );
                }

                res.status(201).json({
                    requestSent: true,
                });
            } else {
                throw new Error("Cannot send request please try again!");
            }
        }
    } catch (error) {
        console.log("Error in Make Request Controller: ", error.message);
        res.status(500).json({
            error: "Server Error: Interval error occurred during sending request!",
        });
    }
};

export const deleteReq = async (req, res) => {
    try {
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        const sender = await User.findById(senderId).select("-v");
        const receiver = await User.findById(receiverId).select("-v");

        if (!sender) {
            throw new Error("Sender was not found in database! Login Again!");
        }

        if (!receiver) {
            throw new Error("Receiver was not found in database! Refresh");
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

            if (deletedReq.acknowledged) {
                Promise.all([sender.save(), receiver.save()]);

                console.log(
                    `Friend request removed from ${sender.username} to ${receiver.username}`
                );

                const receiverSocketId = getSocketId(receiverId);

                if (receiverSocketId) {
                    io.to(receiverSocketId).emit("requestRemoved", sender);
                    console.log(
                        `requestRemoved Event sent to receiver -> ${receiver.username} with socketId -> ${receiverSocketId}`
                    );
                } else {
                    console.log(
                        `Friend Request receiver -> ${receiver.username} was not online!`
                    );
                }

                if (receiverSocketId) {
                    io.to(receiverSocketId).emit(
                        "requestRemovedSucessfully",
                        sender
                    );
                    console.log(
                        `requestRemovedSucessfully Event sent to receiver -> ${receiver.username} with socketId -> ${receiverSocketId}`
                    );
                } else {
                    console.log(
                        `Friend Request receiver -> ${receiver.username} was not online!`
                    );
                }

                const senderSocketId = getSocketId(senderId);

                if (senderSocketId) {
                    io.to(senderSocketId).emit("requestRemoval", receiver);
                    console.log(
                        `requestRemoval sent to sender -> ${sender.username} with sender's socketId -> ${senderSocketId}, request receiver -> ${receiver.username} `
                    );
                } else {
                    console.log(
                        `Sender -> ${sender.username} of request deleted was not online!`
                    );
                }

                res.status(200).json({
                    requestRemoved: true,
                });
            } else {
                res.status(200).json({
                    requestRemoved: false,
                });
            }
        } else {
            throw Error("Request between users not found!!");
        }
    } catch (error) {
        console.log("Error in Delete Request Controller: ", error.message);
        res.status(500).json({
            error: "Server Error: Internal error occurred during deleting request!",
        });
    }
};

export const getRequestStatus = async (req, res) => {
    try {
        const { id: receiverId } = req.params;
        const userId = req.user._id;
        const user = await User.findById(userId);

        if (user) {
            const friends = user.friends;
            const acceptedReceiversId = friends.find((id) =>
                id.equals(receiverId)
            );
            if (acceptedReceiversId) {
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
            throw new Error("User not found in Db!");
        }
    } catch (error) {
        console.log("Error occurred during status request!");
        throw new Error("Error occurred during status", error.message);
    }
};
