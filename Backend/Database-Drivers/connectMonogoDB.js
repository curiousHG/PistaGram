import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGO_DB_URI = process.env.MONGO_DB_URI;

const connectMongoDB = async () => {
    try {
        await mongoose.connect(MONGO_DB_URI);
        console.log(
            `Connection Successfull: Handshake with MONGO DB executed succesfully!`
        );
    } catch (error) {
        console.log(
            "Connection Unsuccessfull: Handshake with MONGO DB failed!",
            error.message
        );
    }
};

export default connectMongoDB;
