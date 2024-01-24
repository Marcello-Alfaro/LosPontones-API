import express from 'express';
import imageController from '../controllers/imageController.js';
import authorization from '../middlewares/authorization.js';
const router = express.Router();

router.get('/photos/:image', imageController.getImage);
router.get('/evidence/:image', imageController.getImage);
router.get('/redirect/storage-server', authorization, imageController.redirectStorage);
router.put('/redirect/main-server', authorization, imageController.redirectMain);

export default router;
