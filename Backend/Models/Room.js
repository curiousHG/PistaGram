import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
    {
        people: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        messages: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Message",
                default: [],
            },
        ],
        lastUpdated: {
            type: Number,
            default: -1,
        },
    },
    { timestamps: true }
);

const Room = mongoose.model("Room", roomSchema);

export default Room;
