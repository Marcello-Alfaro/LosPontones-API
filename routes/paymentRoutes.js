import express from 'express';
import authorization from '../middlewares/authorization.js';
import paymentController from '../controllers/paymentController.js';
const router = express.Router();

router.get('/:paymentId', authorization, paymentController.getPayment);
router.post('/add', authorization, paymentController.postAddPayment);

export default router;
