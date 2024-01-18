import express from 'express';
import athleteController from '../controllers/athleteController.js';
import authorization from '../middlewares/authorization.js';
const router = express.Router();

router.get('/', authorization, athleteController.getAtheletes);
router.get('/:athleteId', authorization, athleteController.getAthlete);
router.get('/payments/:athleteId', authorization, athleteController.getAthletePayments);
router.post('/add', authorization, athleteController.postAddAthlete);

export default router;
