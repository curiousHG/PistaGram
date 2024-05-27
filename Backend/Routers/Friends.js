import express from "express";
import secureRoute from "../Middleware/secureRoute.js";
import {
    acceptRequest,
    rejectRequest,
    removeFriend,
} from "../Controllers/Friends.js";
import { LOGGER } from "../server.js";

const friendsRouter = express.Router();

LOGGER.debug(
    `Friends router - Request received on friends router, sending it to respective controller`
);

friendsRouter.post("/accept/:id", secureRoute, acceptRequest);
friendsRouter.post("/reject/:id", secureRoute, rejectRequest);
friendsRouter.delete("/:id", secureRoute, removeFriend);

export default friendsRouter;
