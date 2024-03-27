import express from "express";

const authenticationRouter = express.Router();

authenticationRouter.post("/signup", (req, res) => {

});

authenticationRouter.post("/login", (req, res) => {
    res.send("Login Route");
});

authenticationRouter.post("/logout", (req, res) => {

});

export default authenticationRouter;