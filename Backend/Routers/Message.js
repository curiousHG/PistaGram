import express from "express";
import { getMessages, addMessage } from "../Controllers/Message.js";
import secureRoute from "../Middleware/secureRoute.js";

const messagingRouter = express.Router();

messagingRouter.get("/:id", secureRoute, getMessages);
messagingRouter.post("/send/:id", secureRoute, addMessage);

export default messagingRouter;
