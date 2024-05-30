import User from "../Models/User.js";
import { LOGGER } from "../server.js";

export const getAllUsers = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const users = await User.find({ _id: { $ne: loggedInUserId } })
            .select("-password")
            .select("-incomingFriendsReq")
            .select("-outgoingFriendsReq")
            .select("-__v")
            .select("-friends");

        const allUsersResult = [];
        users.forEach((user) => {
            const userResult = { ...user, status: "not friends" };
            allUsersResult.push(userResult);
        });

        LOGGER.info(
            `Get All Users controller - Sent all users back to User - { _id - ${loggedInUserId} }`
        );

        return res.status(200).json(allUsersResult);
    } catch (error) {
        LOGGER.error(
            `Get All Users controller - ${error.name} occurred during getting all users - ${error.message}`
        );

        res.status(500).json({
            error: `${error.name} occurred during getting all users - ${error.message}`,
        });
    }
};

export const getAllFriends = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const user = await User.findById(loggedInUserId).populate("friends");
        const friends = user.friends;

        const friendsResultArr = [];
        friends.forEach((friend) => {
            const friendResult = {
                _id: friend._id,
                firstname: friend.firstname,
                lastname: friend.lastname,
                username: friend.username,
                email: friend.email,
                createdAt: friend.createdAt,
                updatedAt: friend.updatedAt,
                profilePicture: friend.profilePicture,
                status: "friends",
            };
            friendsResultArr.push(friendResult);
        });

        LOGGER.info(
            `Get All Friends controller - Sent all friends back to User - { _id - ${loggedInUserId} }`
        );

        return res.status(200).json(friendsResultArr);
    } catch (error) {
        LOGGER.error(
            `Get All Friends controller - ${error.name} occurred during getting all friends - ${error.message}`
        );

        res.status(500).json({
            error: `${error.name} occurred during getting all friends - ${error.message}`,
        });
    }
};

export const getAllNonFriends = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const user = await User.findById(loggedInUserId)
            .populate("friends")
            .populate("outgoingFriendsReq")
            .populate("incomingFriendsReq");

        const friends = user.friends;
        const friends_id = friends.map((friend) => friend._id);

        const outgoingFriendsReq = user.outgoingFriendsReq;
        const incomingFriendsReq = user.incomingFriendsReq;

        const nonFriendUsers = await User.find({ _id: { $nin: friends_id } })
            .find({ _id: { $ne: loggedInUserId } })
            .select("-password");

        const nonFriendsResultArr = [];
        nonFriendUsers.forEach((nonFriend) => {
            let reqFound = false;

            outgoingFriendsReq.forEach((req) => {
                if (
                    req.senderId.equals(loggedInUserId) &&
                    req.receiverId.equals(nonFriend._id)
                ) {
                    reqFound = true;
                }
            });

            incomingFriendsReq.forEach((req) => {
                if (
                    req.senderId.equals(nonFriend._id) &&
                    req.receiverId.equals(loggedInUserId)
                ) {
                    reqFound = true;
                }
            });

            const nonFriendResult = {
                _id: nonFriend._id,
                firstname: nonFriend.firstname,
                lastname: nonFriend.lastname,
                username: nonFriend.username,
                email: nonFriend.email,
                createdAt: nonFriend.createdAt,
                updatedAt: nonFriend.updatedAt,
                profilePicture: nonFriend.profilePicture,
                status: reqFound ? "pending" : "not friends",
            };
            nonFriendsResultArr.push(nonFriendResult);
        });

        LOGGER.info(
            `Get All Non Friends controller - Sent all non friends back to User - { _id - ${loggedInUserId} }`
        );

        return res.status(200).json(nonFriendsResultArr);
    } catch (error) {
        LOGGER.error(
            `Get All Non Friends controller - ${error.name} occurred during getting all non friends - ${error.message}`
        );

        res.status(500).json({
            error: `${error.name} occurred during getting all non friends - ${error.message}`,
        });
    }
};

export const getPendingReqUsers = async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId).populate("incomingFriendsReq");

        const incomingReqUsersId = user.incomingFriendsReq.map(
            (request) => request.senderId
        );

        const incomingReqUsers = await User.find({
            _id: { $in: incomingReqUsersId },
        })
            .select("-password")
            .select("-incomingFriendsReq")
            .select("-outgoingFriendsReq")
            .select("-__v")
            .select("-friends");

        const incomingRequestResult = [];
        incomingReqUsers.forEach((incomingReq) => {
            const incomingRequest = {
                _id: incomingReq._id,
                firstname: incomingReq.firstname,
                lastname: incomingReq.lastname,
                username: incomingReq.username,
                email: incomingReq.email,
                createdAt: incomingReq.createdAt,
                updatedAt: incomingReq.updatedAt,
                profilePicture: incomingReq.profilePicture,
                status: "pending",
            };
            incomingRequestResult.push(incomingRequest);
        });

        LOGGER.info(
            `Get All Pending Request Users controller - Sent all pending requst users back to User - { _id - ${userId} }`
        );

        res.status(200).json(incomingRequestResult);
    } catch (error) {
        LOGGER.error(
            `Get All Pending Request Users controller - ${error.name} occurred during getting all pending requst users - ${error.message}`
        );

        res.status(500).json({
            error: `${error.name} occurred during getting all pending requst users - ${error.message}`,
        });
    }
};
