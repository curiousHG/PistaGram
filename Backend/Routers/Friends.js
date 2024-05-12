import express from "express";
import secureRoute from "../Middleware/secureRoute.js";
import { acceptRequest, removeFriend } from "../Controllers/Friends.js";

const friendsRouter = express.Router();

friendsRouter.post("/:id", secureRoute, acceptRequest);
friendsRouter.delete("/:id", secureRoute, removeFriend);

export default friendsRouter;
