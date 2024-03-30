import mongoose from "mongoose";

const schemaOptions = {
    timestamps: {
        createdAt: 'created_at', 
        updatedAt: 'updated_at'
    }
};

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 5
    }, 
    profilePicture: {
        type: String,
        default: "",
    }
});

const User = mongoose.model("User", userSchema, schemaOptions);

export default User;