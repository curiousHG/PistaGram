import express from "express";
import secureRoute from "../Middleware/secureRoute.js";
import {
    getAllFriends,
    getAllNonFriends,
    getAllUsers,
} from "../Controllers/User.js";

const userRouter = express.Router();

userRouter.get("/all", secureRoute, getAllUsers);
userRouter.get("/friends", secureRoute, getAllFriends);
userRouter.get("/discover", secureRoute, getAllNonFriends);

export default userRouter;
