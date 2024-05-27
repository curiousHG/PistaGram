import express from "express";
import { login, logout, signup } from "../Controllers/Authentication.js";
import { LOGGER } from "../server.js";

const authenticationRouter = express.Router();

LOGGER.debug(
    `Authentication router - Request received on authentication router, sending it to respective controller`
);

authenticationRouter.post("/signup", signup);
authenticationRouter.post("/login", login);
authenticationRouter.post("/logout", logout);

export default authenticationRouter;
