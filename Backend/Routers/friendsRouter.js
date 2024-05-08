import express from "express";
import secureRoute from "../Middleware/secureRoute.js";
import {
    deleteFriendReq,
    sendFriendReq,
} from "../Controllers/friendReqController.js";

const friendsRouter = express.Router();

friendsRouter.post("/sendReq/:id", secureRoute, sendFriendReq);
friendsRouter.post("/deleteReq/:id", secureRoute, deleteFriendReq);

export default friendsRouter;
