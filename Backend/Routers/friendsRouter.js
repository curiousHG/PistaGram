import express from "express";
import secureRoute from "../Middleware/secureRoute.js";
import { sendFriendReq } from "../Controllers/friendReqController.js";

const friendsRouter = express.Router();

friendsRouter.post("/sendReq/:id", secureRoute, sendFriendReq);

export default friendsRouter;
