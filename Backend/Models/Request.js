import mongoose from "mongoose";

const requestSchema = new mongoose.Schema(
    {
        senderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        receiverId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    },
    {
        timestamps: true,
    }
);

const Request = mongoose.model("Request", requestSchema);

export default Request;
