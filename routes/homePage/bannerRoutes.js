import express from 'express';
import { createBanner, getBanners, deleteBanner } from '../../controllers/homePage/bannerController.js';
import { AdminToken } from '../../middlewares/authMiddleware.js';
import upload from '../../middlewares/upload.js';

const router = express.Router();

router.post('/create', AdminToken, upload.single('image'), createBanner);  //✅
router.get('/get-all', AdminToken, getBanners);  //✅
router.delete('/delete/:id', AdminToken, deleteBanner); ////✅
export default router;
