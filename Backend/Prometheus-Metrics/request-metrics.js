import client from "prom-client";

export const requestResponseTimeCycle = new client.Histogram({
    name: "request_response_time",
    help: "Time to serve a request by express server in ms",
    labelNames: ["method", "route", "status_code"],
    buckets: [0.1, 0.3, 0.5, 0.7, 1, 3, 5, 7, 10, 20, 40, 80, 200, 500, 1000],
});

export const totalRequestCounter = new client.Counter({
    name: "total_requests",
    help: "Counts total requests landed on the server",
});
