import { Server } from "socket.io";
import http from "http";
import express from "express";
import dotenv from "dotenv";

const app = express();
dotenv.config();

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "https://pistagram.onrender.com/",
        methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
    },
});

export const getSocketId = (id) => {
    return userSocketMap[id];
};

const userSocketMap = {};

io.on("connection", (socket) => {
    console.log("User connected on - ", socket.id);

    const userId = socket.handshake.query.userId;
    if (userId != "undefined") userSocketMap[userId] = socket.id;

    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", () => {
        console.log("User disconnected from - ", socket.id);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
});

export { app, io, server };
