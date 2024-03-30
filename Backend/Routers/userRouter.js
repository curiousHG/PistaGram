import express from "express";
import secureRoute from "../Middleware/secureRoute.js";
import { getUsers } from "../Controllers/userController.js";

const userRouter = express.Router();

userRouter.get("/", secureRoute, getUsers);

export default userRouter;
