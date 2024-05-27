import express from "express";
import {
    getMessages,
    addMessage,
    deleteMessage,
    editMessage,
} from "../Controllers/Message.js";
import secureRoute from "../Middleware/secureRoute.js";
import { LOGGER } from "../server.js";

const messagingRouter = express.Router();

LOGGER.debug(
    `Message router - Request received on message router, sending it to respective controller`
);

messagingRouter.get("/:id", secureRoute, getMessages);
messagingRouter.post("/send/:id", secureRoute, addMessage);
messagingRouter.delete("/:id", secureRoute, deleteMessage);
messagingRouter.patch("/:id", secureRoute, editMessage);

export default messagingRouter;
