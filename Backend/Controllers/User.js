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

        if (!users) {
            return res.status(200).json([]);
        }
        return res.status(200).json(users);
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

        return res.status(200).json(friends);
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
        const user = await User.findById(loggedInUserId).populate("friends");
        const friends = user.friends;
        const friends_id = friends.map((friend) => friend._id);

        const nonFriendUsers = await User.find({ _id: { $nin: friends_id } })
            .find({ _id: { $ne: loggedInUserId } })
            .select("-password")
            .select("-incomingFriendsReq")
            .select("-outgoingFriendsReq")
            .select("-__v")
            .select("-friends");

        return res.status(200).json(nonFriendUsers);
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

        res.status(200).json(incomingReqUsers);
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
