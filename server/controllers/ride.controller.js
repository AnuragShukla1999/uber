import { validationResult } from "express-validator"



export const createRide = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    };


    const { userId, pickup, destination, vehicleType } = req.body;

    try {
        const ride = await 
    } catch (error) {
        
    }
}