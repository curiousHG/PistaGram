import express from "express";
import dotenv from "dotenv";
import authenticationRouter from "./Routers/authenticationRouter.js";
import connectMongoDB from "./Database-Drivers/connectMonogoDB.js";

dotenv.config();

// Server Configs
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 8000;

// Route Handlers 
app.use("/api/auth", authenticationRouter);


// Start Server on default PORT
app.listen(PORT, () => {
    connectMongoDB();
    console.log(`Running on PORT -> ${PORT}`)
});
