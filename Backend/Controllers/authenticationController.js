import User from "../Models/User";
import bcrypt from "bcryptjs";
import generateJWT from "../Utils/generateJWT";

const signup = async(req, res) => {
    try {
        const { firstName, lastName, username, email, password } = req.body;
        const query = {
            username: username,
            email: email
        };

        // Search in DB for user and email infos
        const user = User.find({username: query.username}) || User.find({email: query.email});

        if(user) {
            return res.status(400).json({error: `User with username- ${username} and email- ${email} already exists! Either Login or choose a different field`});
        }

        // Hash the password
        const salt = await bcrypt.genSalt(30);
        const hashedPwd = await bcrypt.hash(password, salt);

        const defaultProfilePic = `https://avatar.iran.liara.run/username?username=[${firstname}+${lastName}]`;
        const userData = {
            firstName: firstName,
            lastName: lastName,
            username: username,
            email: email,
            password: hashedPwd,
            profilePicture: defaultProfilePic
        };

        const registeredUser = new User(userData);

        if(registeredUser) {
            await registeredUser.save();

            generateJWT(registeredUser._id, res);

            delete userData.password;
            return res.status(201).json({
                _id: registeredUser._id,
                userData: userData
            });

        } else {
            return res.status(400).json({ error: "User data found invalid!"});
        }

    } catch (error) {
        console.log("Error in Signup Controller: ", error.message);
        res.status(500).json("Server Error: Internal error occurred during sign up!");
    }
};

const login = (req, res) => {
    try{
        const { username, password } = req.body;
        const userData = {
            username: username,
        }
        const user = User.findOne(userData);

        const hashedPwd = user.password;

        
    } catch (error) {

    }
};

const logout = (req, res) => {

};