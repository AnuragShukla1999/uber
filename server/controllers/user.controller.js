import { validationResult } from "express-validator"
import userModel from "../models/user.model.js";

import Token from "../models/blackListTokenModel.js";
// import { createUser } from "../services/user.services.js";
// import userService from "../services/user.services.js";


export const registerUser = async (req, res, next) => {
    try {
        // Validate the request body
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { fullname, email, password } = req.body;

        // Check if the user already exists
        const isUserAlready = await userModel.findOne({ email });
        if (isUserAlready) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash the password
        const hashPassword = await userModel.hashPassword(password);

        // Create the new user
        const user = await userModel.create({
            fullname: {
                firstname: fullname.firstname,
                lastname: fullname.lastname,
            },
            email,
            password: hashPassword,
        });

        // Generate an auth token
        const token = user.generateAuthToken();

        // Respond with the token and user
        return res.status(201).json({ token, user });
    } catch (err) {
        // Handle server errors
        console.error(err);
        return res.status(500).json({ message: "Internal server error", error: err.message });
    }
};


export const loginUser = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    };

    const { email, password } = req.body;

    const user = await userModel.findOne({ email }).select('+password');

    if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
    };

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password!' })
    };

    const token = user.generateAuthToken();

    res.cookie('token', token);

    res.status(200).json({ token, user });
};



export const getUserProfile = async (req, res, next) => {
    res.status(200).json(req.user);
};


export const logoutUser = async (req, res, next) => {
    res.clearCookie('token');

    const token = req.cookies.token || req.headers.authorization.split(' ')[1];

    await Token.create({ token });

    res.status(200).json({ message: 'Logged out' });
}