import dotenv from "dotenv";
import mongoose from "mongoose";
import { LOGGER } from "../server.js";

dotenv.config();

const MONGO_DB_URI = process.env.MONGO_DB_URI;

const connectMongoDB = async () => {
    try {
        await mongoose.connect(MONGO_DB_URI);
        console.log(
            `Connection Successfull: Handshake with MONGO DB executed succesfully!`
        );
        LOGGER.info(
            `CONNECTION MONGODB - Handshake with MONGO DB { URI - ${MONGO_DB_URI} } executed succesfully!`
        );
    } catch (error) {
        LOGGER.error(
            `CONNECTION MONGODB - ${error.name} occurred during connecting to mongodb - ${error.message}`
        );

        res.status(500).json({
            error: `${error.name} occurred during connecting to mongodb - ${error.message}`,
        });
    }
};

export default connectMongoDB;
