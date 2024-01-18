import express from 'express';
import authController from '../controllers/authController.js';
const router = express.Router();

router.get('/verify-token/:token', authController.getVerifyToken);
router.put('/login', authController.putLogin);

export default router;
