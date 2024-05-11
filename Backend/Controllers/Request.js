import Request from "../Models/Request";
import User from "../Models/User";

export const sendRequest = async (req, res) => {
    try {
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        const sender = await User.findById(senderId);
        const receiver = await User.findById(receiverId);

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

                res.status(201).json({
                    _id: newRequest._id,
                    senderId: newRequest.senderId,
                    receiverId: newRequest.receiverId,
                });
            } else {
                throw new Error(
                    "Request model object was not created! Try again"
                );
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

        const sender = await User.findById(senderId);
        const receiver = await User.findById(receiverId);

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
                (requestId) => requestId !== request._id
            );
            const receiversInReq = receiver.incomingFriendsReq.filter(
                (requestId) => requestId !== request._id
            );

            sender.outgoingFriendsReq = sendersOutReq;
            receiver.incomingFriendsReq = receiversInReq;

            const deletedReq = await Request.findByIdAndDelete(request._id);
            Promise.all(sender.save(), receiver.save(), request.save());
            res.status(200).json(deletedReq);
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
