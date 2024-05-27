import express from "express";
import secureRoute from "../Middleware/secureRoute.js";
import {
    getAllFriends,
    getAllNonFriends,
    getAllUsers,
    getPendingReqUsers,
} from "../Controllers/User.js";
import { LOGGER } from "../server.js";

const userRouter = express.Router();

LOGGER.debug(
    `User router - Request received on user router, sending it to respective controller`
);

userRouter.get("/all", secureRoute, getAllUsers);
userRouter.get("/friends", secureRoute, getAllFriends);
userRouter.get("/discover", secureRoute, getAllNonFriends);
userRouter.get("/pending", secureRoute, getPendingReqUsers);

export default userRouter;
