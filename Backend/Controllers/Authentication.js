import User from "../Models/User.js";
import bcrypt from "bcryptjs";
import generateJWT from "../Utils/generateJWT.js";

export const signup = async (req, res) => {
    try {
        const { firstname, lastname, username, email, password } = req.body;
        const query = {
            username: username,
            email: email,
        };

        // Search in DB for user and email infos
        const user =
            (await User.findOne({ username: query.username })) ||
            (await User.findOne({ email: query.email }));

        if (user) {
            return res.status(400).json({
                error: `User with username- ${username} and email- ${email} already exists! Login directly!`,
            });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPwd = await bcrypt.hash(password, salt);

        const defaultProfilePic = `https://avatar.iran.liara.run/username?username=${firstname}+${lastname}`;
        const userData = {
            firstname: firstname,
            lastname: lastname,
            username: username,
            email: email,
            password: hashedPwd,
            profilePicture: defaultProfilePic,
        };

        const registeredUser = new User(userData);

        if (registeredUser) {
            await registeredUser.save();

            generateJWT(registeredUser._id, res);

            res.status(201).json({
                _id: registeredUser._id,
                firstname: userData.firstname,
                lastname: userData.lastname,
                email: userData.email,
                profilePicture: userData.profilePicture,
            });
        } else {
            res.status(400).json({ error: "User data found invalid!" });
        }
    } catch (error) {
        console.log("Error in Signup Controller: ", error.message);
        res.status(500).json({
            error: "Server Error: Internal error occurred during sign up!",
        });
    }
};

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const query = {
            username: username,
        };
        const user = await User.findOne(query);
        if (user) {
            const correctPwd = await bcrypt.compare(password, user.password);
            if (!correctPwd) {
                return res
                    .status(404)
                    .json({ error: `Invalid password! Please type again` });
            }

            generateJWT(user._id, res);

            return res.status(200).json({
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                username: user.username,
                email: user.email,
                profilePicture: user.profilePicture,
            });
        } else {
            res.status(404).json({
                error: `User with username- ${username} is not registered! Please Signup first to login`,
            });
        }
    } catch (error) {
        console.log("Error in Login Controller: ", error.message);
        res.status(500).json({
            error: "Server Error: Internal error occurred during login!",
        });
    }
};

export const logout = async (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        return res.status(200).json({ message: "Logged out successfully!" });
    } catch (error) {
        console.log("Error in Logout Controller", error.message);
        return res.status(500).json({
            error: "Server Error: Internal error occurred during logout!",
        });
    }
};
