import captainModel from "../models/captainModel.js";
import { createCaptain } from "../services/captain.service.js";

import { validationResult } from 'express-validator';
import blackListTokenModel from '../models/blackListTokenModel.js';


export const registerCaptain = async (req, res, next) => {
    const error = validationResult(req);

    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() })
    };

    const { fullname, email, password, vehicle } = req.body;

    const isCaptainAlreadyExist = await captainModel.findOne({ email:email });

    if (isCaptainAlreadyExist) {
        return res.status(400).json({ message: 'Captain already exist' });
    };

    const hashPassword = await captainModel.hashPassword(password);

    const captain = await createCaptain({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email:email,
        password: hashPassword,
        color: vehicle.plate,
        plate: vehicle.capacity,
        vehicleType: vehicle.vehicleType
    });

    const token = captain.generateAuthToken();

    res.status(201).json({ token:token, captain:captain });

};


export const loginCaptain = async (req, res, next) => {
    const error = validationResult(req);

    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
    };


    const { email, password } = req.body;

    const captain = await captainModel.findOne({ email: email }).select('+password');

    if (!captain) {
        return res.status(401).json({ message: 'Invalid email or password' });
    };

    const isMatch = await captain.comparePassword(password);

    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
    };


    const token = captain.generateAuthToken();

    res.cookie('token', token);

    res.status(200).json({ token:token, captain:captain });
};


export const getCaptainProfile = async (req, res, next) => {
    res.status(200).json({ captain: req.captain });
}


export const logoutCaptain = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    await blackListTokenModel.create({ token:token });

    res.clearCookie('token');

    res.status(200).json({ message: 'Logout successfully' });
}