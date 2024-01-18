import express from 'express';
import authorization from '../middlewares/authorization.js';
import trainerControlller from '../controllers/trainerControlller.js';
const router = express.Router();

router.get('/', authorization, trainerControlller.getTrainers);
router.post('/add', authorization, trainerControlller.postAddTrainer);

export default router;
