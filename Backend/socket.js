import { Server } from "socket.io";
import { createServer } from "http";
import express from "express";
import dotenv from "dotenv";

const app = express();
dotenv.config();

const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "https://ec2-16-171-129-124.eu-north-1.compute.amazonaws.com/",
        methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
    },
});

const getSocketId = (receiverId) => {
    return userSocketMap[receiverId];
};

const userSocketMap = {};

io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;
    if (userId != "undefined") {
        userSocketMap[userId] = socket.id;
        console.log(`User with userId - ${userId} connected on - ${socket.id}`);

        io.emit("getOnlineUsers", Object.keys(userSocketMap));

        socket.on("disconnect", () => {
            console.log(
                `User with userId - ${userId} disconnected from - ${socket.id} `
            );
            delete userSocketMap[userId];
            io.emit("getOnlineUsers", Object.keys(userSocketMap));
        });
    } else {
        console.log(
            `Error during socket connection- User's id found to be undefined!`
        );
    }
});

export { app, io, server, getSocketId };
