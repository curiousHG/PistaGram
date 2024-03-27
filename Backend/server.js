import express from "express";
import dotenv from "dotenv";
import authenticationRouter from "./Routers/authenticationRouter.js";

dotenv.config();

// Server Configs
const PORT = process.env.PORT || 8000;

const app = express();
app.use("/api/auth", authenticationRouter);

app.listen(PORT, () => console.log(`Running on PORT -> ${PORT}`));
