import express from "express";
import { login, logout, signup } from "../Controllers/authenticationController.js";

const authenticationRouter = express.Router();

authenticationRouter.post("/signup", signup);
authenticationRouter.post("/login", login);
authenticationRouter.post("/logout", logout);

export default authenticationRouter;