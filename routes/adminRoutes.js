// import express from 'express';
// import { adminLogin } from '../controllers/adminController.js';

// const router = express.Router();

// router.post('/login', adminLogin);

// export default router;

import express from 'express';
import {
  adminLogin,
  adminForgotPassword,
  verifyAdminOtp,
  adminResetPassword,
} from '../controllers/adminController.js';

import {
  getAdminProfile,
  updateAdminProfile,
} from '../controllers/adminController.js';

import { AdminToken } from '../middlewares/authMiddleware.js';
import upload from '../middlewares/upload.js';

const router = express.Router();

/* AUTH */
router.post('/login', adminLogin);
router.post('/forgot-password', adminForgotPassword);
router.post('/verify-otp', verifyAdminOtp);
router.post('/reset-password', adminResetPassword);

/* ADMIN PROFILE (SINGLE) */
router.get('/profile', AdminToken, getAdminProfile);
router.put('/profile', AdminToken, upload.single('photo'), updateAdminProfile);

export default router;
