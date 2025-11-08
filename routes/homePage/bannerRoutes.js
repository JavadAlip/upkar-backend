const express = require('express');
const router = express.Router();
const { createBanner, getBanners } = require('../../controllers/homePage/bannerController');
const { AdminToken } = require('../../middlewares/authMiddleware');

// /banner
router.post('/create-banner', AdminToken, createBanner); //✅
router.get('/get-all-banners', AdminToken, getBanners); //✅

module.exports = router;


