import User from "../Models/User.js";

export const getUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password");
        if (!users) {
            return res.status(200).json([]);
        }
        return res.status(200).json(users);
    } catch (error) {
        console.log("Error in Get Users Controller: ", error.message);
        res.status(500).json({
            error: "Server Error: Internal error occurred during getting users!",
        });
    }
};
