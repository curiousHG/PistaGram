import jwt from "jsonwebtoken";

const generateJWT = (userId, res) => {
    const webToken = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
        expiresIn: "5d",
    });

    res.cookie("jwt", webToken, {
        maxAge: 5 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
        secure: false,
    });
};

export default generateJWT;
