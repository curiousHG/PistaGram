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
import responseTime from "response-time";
import { createLogger, transports } from "winston";
import LokiTransport from "winston-loki";

// Server Configs
dotenv.config();
app.use(express.json());
app.use(cookieParser());
const PORT = process.env.PORT || 8000;

const options = {
    labels: {
        appName: "pistagram-server",
    },
    transports: [
        new LokiTransport({
            host: "http://127.0.0.1:3100",
        }),
    ],
};

const LOGGER = createLogger(options);

// Prometheus client
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics({ register: client.register });

const requestResponseTime = new client.Histogram({
    name: "http_express_req_res_time",
    help: "How much time is taken in request response",
    labelNames: ["method", "route", "status_code"],
    buckets: [
        1, 50, 100, 200, 400, 500, 800, 1000, 2000, 3000, 4000, 5000, 6000,
        7000, 8000, 9000, 10000,
    ],
});

const totalRequestCounter = new client.Counter({
    name: "total_requests",
    help: "Counts total request on the server",
});

app.use(
    responseTime((req, res, time) => {
        totalRequestCounter.inc();
        requestResponseTime
            .labels({
                method: req.method,
                route: req.url,
                status_code: res.statusCode,
            })
            .observe(time);
    })
);

const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, "Frontend", "dist")));

app.get("/", (req, res) => {
    LOGGER.info("Request came on route / ");
    res.send("Server is runnning");
});

app.get("/metrics", async (req, res) => {
    LOGGER.info("Request came on route /metrics");
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
    LOGGER.info("Request came to get frontend build files");
    res.sendFile(path.join(__dirname, "Frontend", "dist", "index.html"));
});

// Start Server on default PORT
server.listen(PORT, async () => {
    await connectMongoDB();
    console.log(`Running on PORT -> ${PORT}`);
});
