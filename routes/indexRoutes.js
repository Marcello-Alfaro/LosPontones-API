import express from 'express';
import athleteRoutes from './athleteRoutes.js';
import contactRoutes from './contactRoutes.js';
import paymentRoutes from './paymentRoutes.js';
import trainerRoutes from './trainerRoutes.js';
import authRoutes from './authRoutes.js';
import imageRoutes from './imageRoutes.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/athletes', athleteRoutes);
router.use('/trainers', trainerRoutes);
router.use('/contacts', contactRoutes);
router.use('/payments', paymentRoutes);
router.use('/images', imageRoutes);

export default router;
