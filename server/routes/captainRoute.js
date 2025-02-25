import express from 'express';
import { getCaptainProfile, loginCaptain, logoutCaptain, registerCaptain } from '../controllers/captain.controller.js';

const router = express.Router();

router.post('/register', registerCaptain);
router.post('/login', loginCaptain);
router.post('/profile', getCaptainProfile);
router.post('/logout', logoutCaptain);

export default router;