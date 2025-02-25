import express from 'express';
import { getCoordinatesController, getDistanceTimeController, getAutoCompleteSuggestionsController } from '../controllers/map.controller';

const router = express.Router();

router.post('/get-coordinates', getCoordinatesController);
router.post('/get-distance-time', getDistanceTimeController);
router.post('/get-suggestions', getAutoCompleteSuggestionsController);


export default router;