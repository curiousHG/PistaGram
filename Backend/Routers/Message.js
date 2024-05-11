import express from "express";
import {
    getMessages,
    addMessage,
    deleteMessage,
} from "../Controllers/Message.js";
import secureRoute from "../Middleware/secureRoute.js";

const messagingRouter = express.Router();

messagingRouter.get("/:id", secureRoute, getMessages);
messagingRouter.post("/send/:id", secureRoute, addMessage);
messagingRouter.delete("/:id", secureRoute, deleteMessage);
// messagingRouter.patch("/:id", secureRoute, null);

export default messagingRouter;
