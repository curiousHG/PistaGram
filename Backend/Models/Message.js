import mongoose, { Schema, model } from "mongoose";

const schemaOptions = {
    timestamps: {
        createdAt: 'created_at', 
        updatedAt: 'updated_at'
    }
};

const messageSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    message: {
        type: String,
        required: true
    }
});

const Message = new model("Message", messageSchema, schemaOptions);

export default Message;