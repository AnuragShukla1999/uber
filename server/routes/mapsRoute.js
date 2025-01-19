import express from 'express';
import { getCoordinatesController, getDistanceTimeController, getAutoCompleteSuggestionsController } from '../controllers/map.controller';

const router = express.Router();

router.post('/get-coordinates', getCoordinatesController);
router.post('/get-distance-time', getDistanceTimeController);
router.post('/get-suggestions', getAutoCompleteSuggestionsController);
router.post('/start-ride', startRideController);
router.post('/end-ride', endRideController);

export default router;