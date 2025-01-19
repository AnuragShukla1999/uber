import express from 'express';
import { confirmRideController, createRideController, endRideController, getFareController, startRideController } from '../controllers/ride.controller';

const router = express.Router();

router.post('/create', createRideController);
router.post('/get-fare', getFareController);
router.post('/corfirm', confirmRideController);
router.post('/start-ride', startRideController);
router.post('/end-ride', endRideController);

export default router;