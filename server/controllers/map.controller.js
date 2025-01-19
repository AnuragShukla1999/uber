import { validationResult } from "express-validator"
import { getAddressCoordinate, getAutoCompleteSuggestions, getDistanceTime } from "../services/maps.service";



export const getCoordinatesController = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    };

    const {address } = req.query;

    try {
        const coordinates = await getAddressCoordinate(address);

        res.status(200).json(coordinates);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};



export const getDistanceTimeController = async (req, res, next) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        };

        const { origin, destination } = req.query;

        const distanceTime = await getDistanceTime(origin, destination);

        res.status(200).json(distanceTime);
    } catch (error) {
        console.error(err);
        res.status(500).json({ message: error.message });
    }
};



export const getAutoCompleteSuggestionsController = async (req, res,next) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        };

        const { input } = req.query;

        const suggestions = await getAutoCompleteSuggestions(input);

        res.status(200).json(suggestions);
    } catch (error) {
        console.error(err);
        res.status(500).json({ message: error.message });
    }
}