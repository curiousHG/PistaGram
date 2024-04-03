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
    },
    { timestamps: true }
);

const Room = mongoose.model("Room", roomSchema);

export default Room;
