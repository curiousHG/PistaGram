import express from "express";
import dotenv from "dotenv";
import authenticationRouter from "./Routers/Authentication.js";
import connectMongoDB from "./Database-Drivers/connectMonogoDB.js";
import messagingRouter from "./Routers/Message.js";
import cookieParser from "cookie-parser";
import userRouter from "./Routers/User.js";
import { app, server } from "./socket.js";
import requestRouter from "./Routers/Request.js";
import friendsRouter from "./Routers/Friends.js";
import path from "path";
import client from "prom-client";

// Server Configs
dotenv.config();
app.use(express.json());
app.use(cookieParser());
const PORT = process.env.PORT || 8000;

// Prometheus client
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics({ register: client.register });

const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, "Frontend", "dist")));

app.get("/", (req, res) => {
    res.send("Server is runnning");
});

app.get("/metrics", async (req, res) => {
    res.setHeader("Content-Type", client.register.contentType);

    const metrics = await client.register.metrics();
    res.send(metrics);
});

// Route Handlers
app.use("/api/auth", authenticationRouter);
app.use("/api/users", userRouter);
app.use("/api/messages", messagingRouter);
app.use("/api/request", requestRouter);
app.use("/api/friends", friendsRouter);

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "Frontend", "dist", "index.html"));
});

// Start Server on default PORT
server.listen(PORT, async () => {
    await connectMongoDB();
    console.log(`Running on PORT -> ${PORT}`);
});
