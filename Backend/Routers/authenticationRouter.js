import express from "express";
import { login, signup } from "../Controllers/authenticationController";

const authenticationRouter = express.Router();

authenticationRouter.post("/signup", (req, res) => {
    return signup(req, res);
});

authenticationRouter.post("/login", (req, res) => {
    return login(req, res);
});

authenticationRouter.post("/logout", (req, res) => {
    return logout(req, res);
});

export default authenticationRouter;