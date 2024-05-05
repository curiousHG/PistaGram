import User from "../Models/User";

export const sendFriendReq = async (req, res) => {
    try {
        const { id: receiverId } = req.params;
        const senderId = req.user._id;
        const sender = await User.findOne({ _id: senderId });
        const receiver = await User.findOne({ _id: receiverId });
        sender.outgoingFriendsReq.push(receiver._id);
        receiver.incomingFriendsReq.push(sender._id);

        await Promise.all([sender.save(), receiver.save()]);
        // Emit a socket event
        return res.status(200);
    } catch (error) {
        console.log("Error in Send Friend Request Controller: ", error.message);
        res.status(500).json({
            error: "Server Error: Internal error occurred during sending friend req!",
        });
    }
};

export const deleteFriendReq = async (req, res) => {
    try { 

    }
};