import { validationResult } from "express-validator";
import { confirmRide, createRide, endRide, getFare, startRide } from "../services/ride.service.js";
import { getAddressCoordinate, getCaptainsInTheRadius } from "../services/maps.service.js";
import rideModel from "../models/rideModel.js";


export const createRideController = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    };


    const { userId, pickup, destination, vehicleType } = req.body;

    try {
        const ride = await createRide({ user: req.user.id, pickup, destination, vehicleType });

        res.status(201).json(ride);

        const pickupCoordinates = await getAddressCoordinate(pickup);

        const captainInRadius = await getCaptainsInTheRadius(pickupCoordinates.ltd, pickupCoordinates.lng, 2);

        ride.otp = "";

        const rideWithUser = await rideModel.findOne({ _id: ride._id }).populate('user');

        captainInRadius.map(captain => {
            sendMessageToSocketId(captain.socketId, {
                event: 'new-ride',
                data: rideWithUser
            })
        })
    } catch (error) {
        console.log('err ----->  ', err);
        return res.status(500).json({ message: err.message });
    }
};





export const getFareController = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    };


    const { pickup, destination } = req.query;

    try {
        const fare = await getFare(pickup, destination);
        return res.status(200).json(fare);
    } catch (error) {
        return res.status(500).json({ message: err.message });
    }
};



export const confirmRideController = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    };

    const { rideId } = req.body;

    try {
        const ride = await confirmRide({ rideId, captain: req.captain });

        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-confirmed',
            data: ride
        });

        return res.status(200).json(ride);
    } catch (error) {
        console.log(err);
        return res.status(500).json({ message: err.message });
    }
};



export const startRideController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    };


    const { rideID, otp } = req.query;

    try {
        const ride = await startRide({ rideId, otp, captain: req.captain });

        console.log("ride -----> ", ride);

        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-started',
            data: ride
        });

        return res.status(200).json(ride);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};



export const endRideController = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    };

    const { rideId } = req.body;

    try {
        const ride = await endRide({ rideId, captain: req.captain });

        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-ended',
            data: ride
        })

        return res.status(200).json(ride);
    } catch (error) {
        return res.status(500).json({ message: err.message });
    }
}