import jwt from "jsonwebtoken";
import User from "../Models/User.js";

const secureRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res
                .status(401)
                .json({
                    error: "Unauthorized user detected - Empty JWT token",
                });
        }

        const tokenValid = jwt.verify(token, process.env.JWT_SECRET_KEY);
        if (!tokenValid) {
            return res.status(401).json({
                error: "Unauthorized user detected - Invalid JWT token found!",
            });
        }

        const user = await User.findById(tokenValid.userId).select("-password");
        if (!user) {
            return res
                .status(404)
                .json({
                    error: "User not found! Login again to initate message",
                });
        }

        req.user = user;

        next();
    } catch (error) {
        console.log("Error in Secure Middleware: ", error.message);
        res.status(500).json({
            error: "Server Error: Internal error occurred during security checking!",
        });
    }
};

export default secureRoute;
