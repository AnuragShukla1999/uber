import express from 'express';
import {registerUser, loginUser, getUserProfile, logoutUser } from "../controllers/user.controller.js";

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/profile', getUserProfile);
router.post('/logout', logoutUser);

export default router;