import express from 'express';
import { createBanner, getBanners } from '../../controllers/homePage/bannerController.js';
import { AdminToken } from '../../middlewares/authMiddleware.js';
import upload from '../../middlewares/upload.js';

const router = express.Router();

router.post('/create-banner', AdminToken, upload.single('image'), createBanner);
router.get('/get-all-banners', AdminToken, getBanners);

export default router;
