import express from "express";
import { getMessages, registerMessage } from "../Controllers/messagingController.js";
import secureRoute from "../Middleware/secureRoute.js";

const messagingRouter = express.Router();

messagingRouter.get("/:id", secureRoute, getMessages);
messagingRouter.post("/send/:id", secureRoute, registerMessage);

export default messagingRouter;