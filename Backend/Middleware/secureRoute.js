import jwt from "jsonwebtoken";
import User from "../Models/User.js";
import { LOGGER } from "../server.js";

const secureRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        LOGGER.info(
            `Secure-Route middleware - Checking token validity for token - ${token}`
        );

        if (!token) {
            LOGGER.error(
                `Secure-Route middleware - Token not found in user request`
            );

            return res.status(401).json({
                error: "Unauthorized user detected - Empty JWT token",
            });
        }

        LOGGER.info(
            `Secure-Route middleware - Token received, checking its validity`
        );

        const tokenValid = jwt.verify(token, process.env.JWT_SECRET_KEY);
        if (!tokenValid) {
            LOGGER.error(`Secure-Route middleware - Token received is invalid`);
            return res.status(401).json({
                error: "Unauthorized user detected - Invalid JWT token found!",
            });
        }

        const user = await User.findById(tokenValid.userId).select("-password");
        if (!user) {
            LOGGER.error(
                `Secure-Route middleware - Found empty user entry for token's userId - ${tokenValid.userId}`
            );
            return res.status(404).json({
                error: "User not found! Login again to initate message",
            });
        }

        LOGGER.info(
            `Secure-Route middleware - Token received has valid user entry - { _id - ${user._id}, name - ${user.firstname} ${user.lastname}, email - ${user.email} }`
        );

        req.user = user;

        LOGGER.info(
            `Secure-Route middleware -  Valid token received calling next function in line`
        );

        next();
    } catch (error) {
        LOGGER.error(
            `Secure-Route middleware - ${error.name} occurred during token validation - ${error.message}`
        );

        res.status(500).json({
            error: `${error.name} occurred during token validation - ${error.message}`,
        });
    }
};

export default secureRoute;
