import Request from "../Models/Request.js";
import User from "../Models/User.js";

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

        return res.status(200).json(allUsersResult);
    } catch (error) {
        console.log("Error in Get All Users Controller: ", error.message);
        res.status(500).json({
            error: "Server Error: Internal error occurred during getting users!",
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

        return res.status(200).json(friendsResultArr);
    } catch (error) {
        console.log("Error in Get Friends Controller: ", error.message);
        res.status(500).json({
            error: "Server Error: Internal error occurred during getting users!",
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

        return res.status(200).json(nonFriendsResultArr);
    } catch (error) {
        console.log("Error in Get All Non Friends Controller: ", error.message);
        res.status(500).json({
            error: "Server Error: Internal error occurred during getting users!",
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

        res.status(200).json(incomingRequestResult);
    } catch (error) {
        console.log(
            "Error occurred during getting pending request users",
            error.message
        );
        throw new Error({
            error: "Error occurred during getting pending request users!",
        });
    }
};
