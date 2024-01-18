import express from 'express';
import contactController from '../controllers/contactController.js';
import authorization from '../middlewares/authorization.js';
const router = express.Router();

router.post('/add/:athleteId', authorization, contactController.postAddContact);

export default router;
