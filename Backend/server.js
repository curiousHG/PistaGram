import express from "express";
import dotenv from "dotenv";
import authenticationRouter from "./Routers/authenticationRouter.js";
import connectMongoDB from "./Database-Drivers/connectMonogoDB.js";
import messagingRouter from "./Routers/messagingRouter.js";
import cookieParser from "cookie-parser";
import userRouter from "./Routers/userRouter.js";
import { app, server } from "./socket.js";
import path from "path";

const __dirname = path.resolve();

// Server Configs
dotenv.config();
app.use(express.json());
app.use(cookieParser());
const PORT = process.env.PORT || 8000;

// Route Handlers
app.use("/api/auth", authenticationRouter);
app.use("/api/users", userRouter);
app.use("/api/messages", messagingRouter);

app.use(express.static(path.join(__dirname, "/Frontend/dist")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "Frontend", "dist", "index.html"));
});

// Start Server on default PORT
server.listen(PORT, async () => {
    await connectMongoDB();
    console.log(`Running on PORT -> ${PORT}`);
});
