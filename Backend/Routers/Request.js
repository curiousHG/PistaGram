import express from "express";
import secureRoute from "../Middleware/secureRoute.js";
import {
    deleteReq,
    getRequestStatus,
    sendRequest,
} from "../Controllers/Request.js";
import { LOGGER } from "../server.js";

const requestRouter = express.Router();

LOGGER.debug(
    `Request router - Request received on request router, sending it to respective controller`
);

requestRouter.get("/status/:id", secureRoute, getRequestStatus);
requestRouter.post("/:id", secureRoute, sendRequest);
requestRouter.delete("/:id", secureRoute, deleteReq);

export default requestRouter;
