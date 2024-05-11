import express from "express";
import secureRoute from "../Middleware/secureRoute.js";
import { deleteReq, sendRequest } from "../Controllers/Request.js";

const requestRouter = express.Router();

requestRouter.post("/:id", secureRoute, sendRequest);
requestRouter.delete("/:id", secureRoute, deleteReq);

export default requestRouter;
