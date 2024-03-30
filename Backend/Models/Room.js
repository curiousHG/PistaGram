import mongoose from "mongoose";

const schemaOptions = {
    timestamps: {
        createdAt: 'created_at', 
        updatedAt: 'updated_at'
    }
};


const roomSchema = new mongoose.Schema({
    people: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    messages: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Message',
            default: []
        }
    ]
});

const Room = mongoose.model("Room", roomSchema, schemaOptions);

export default Room;