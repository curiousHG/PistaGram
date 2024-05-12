import express from "express";
import secureRoute from "../Middleware/secureRoute.js";
import {
    acceptRequest,
    rejectRequest,
    removeFriend,
} from "../Controllers/Friends.js";

const friendsRouter = express.Router();

friendsRouter.post("/accept/:id", secureRoute, acceptRequest);
friendsRouter.post("/reject/:id", secureRoute, rejectRequest);
friendsRouter.delete("/:id", secureRoute, removeFriend);

export default friendsRouter;
