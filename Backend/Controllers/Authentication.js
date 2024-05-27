import User from "../Models/User.js";
import bcrypt from "bcryptjs";
import generateJWT from "../Utils/generateJWT.js";
import { LOGGER } from "../server.js";

export const signup = async (req, res) => {
    try {
        const { firstname, lastname, username, email, password } = req.body;
        const query = {
            username: username,
            email: email,
        };

        LOGGER.info(
            `Signup controller - Received request for User - {name - ${firstname} ${lastname}, username - ${username}, email - ${email}}`
        );

        // Search in DB for user and email infos
        const user =
            (await User.findOne({ username: query.username })) ||
            (await User.findOne({ email: query.email }));

        if (user) {
            LOGGER.error(
                `Signup controller - Aborting request for User - {name - ${firstname} ${lastname}, username - ${username}, email - ${email}} due to duplicacy`
            );

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

        LOGGER.info(
            `Signup controller - Processing request for User - {name - ${firstname} ${lastname}, username - ${username}, email - ${email}}`
        );

        const registeredUser = new User(userData);

        LOGGER.debug(
            `Signup controller - Registered user - { _id - ${registeredUser._id}, name - ${registeredUser.firstname} ${registeredUser.lastname}, email - ${registeredUser.email} } created successfully!`
        );

        if (registeredUser) {
            await registeredUser.save();

            LOGGER.info(
                `Signup controller - Registered user - { _id: ${registeredUser} } successfully on mongo db for User - {name - ${firstname} ${lastname}, username - ${username}, email - ${email}}`
            );

            generateJWT(registeredUser._id, res);

            res.status(201).json({
                _id: registeredUser._id,
                firstname: userData.firstname,
                lastname: userData.lastname,
                username: userData.username,
                email: userData.email,
                profilePicture: userData.profilePicture,
            });
        } else {
            LOGGER.error(
                `Signup controller - Registeration unsuccessfull for User - {name - ${firstname} ${lastname}, username - ${username}, email - ${email}}`
            );
            res.status(400).json({
                error: "User registeration failed! Please check the signup details again",
            });
        }
    } catch (error) {
        LOGGER.error(
            `Signup controller - ${error.name} occurred during signup - ${error.message}`
        );

        res.status(500).json({
            error: `${error.name} occurred during signup - ${error.message}`,
        });
    }
};

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const query = {
            username: username,
        };

        LOGGER.info(
            `Login controller - Received request for User - {username - ${username}}`
        );

        const user = await User.findOne(query);

        if (user) {
            LOGGER.info(
                `Login controller - Comparing password for valid User - { _id - ${user._id}, name - ${user.firstname} ${user.lastname}, username - ${user.username}, email - ${user.email} }`
            );

            const correctPwd = await bcrypt.compare(password, user.password);
            if (!correctPwd) {
                LOGGER.warn(
                    `Login controller - Entered invalid password for User - { _id - ${user._id}, name - ${user.firstname} ${user.lastname}, username - ${user.username}, email - ${user.email} }`
                );
                return res
                    .status(404)
                    .json({ error: `Invalid password! Please type again` });
            }

            LOGGER.info(
                `Login controller - Password matched for User - {  _id - ${user._id}, name - ${user.firstname} ${user.lastname}, username - ${user.username}, email - ${user.email} }`
            );

            generateJWT(user._id, res);

            return res.status(200).json({
                _id: user._id,
                firstname: user.firstname,
                lastname: user.lastname,
                username: user.username,
                email: user.email,
                profilePicture: user.profilePicture,
            });
        } else {
            LOGGER.error(
                `Login controller - Aborting request for User - {username - ${username}} due to empty entry`
            );
            res.status(404).json({
                error: `User with username- ${username} is not registered! Please Signup first to login`,
            });
        }
    } catch (error) {
        LOGGER.error(
            `Login controller - ${error.name} occurred during login - ${error.message}`
        );

        res.status(500).json({
            error: `${error.name} occurred during login - ${error.message}`,
        });
    }
};

export const logout = async (req, res) => {
    try {
        LOGGER.info(`Logout controller - Received request from User`);

        res.cookie("jwt", "", { maxAge: 0 });

        LOGGER.debug(`Logout controller: Removed jwt token from user's cookie`);

        return res.status(200).json({ message: "Logged out successfully!" });
    } catch (error) {
        LOGGER.error(
            `Logout controller - ${error.name} occurred during logout - ${error.message}`
        );

        return res.status(500).json({
            error: `${error.name} occurred during logout - ${error.message}`,
        });
    }
};
