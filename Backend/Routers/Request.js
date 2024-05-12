import express from "express";
import secureRoute from "../Middleware/secureRoute.js";
import {
    deleteReq,
    getRequestStatus,
    sendRequest,
} from "../Controllers/Request.js";

const requestRouter = express.Router();

requestRouter.get("/status/:id", secureRoute, getRequestStatus);
requestRouter.post("/:id", secureRoute, sendRequest);
requestRouter.delete("/:id", secureRoute, deleteReq);

export default requestRouter;
