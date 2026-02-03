// // import express from 'express';
// // import { adminLogin } from '../controllers/adminController.js';

// // const router = express.Router();

// // router.post('/login', adminLogin);

// // export default router;

// import express from 'express';
// import {
//   adminLogin,
//   adminForgotPassword,
//   verifyAdminOtp,
//   adminResetPassword,
// } from '../controllers/adminController.js';

// import {
//   getAdminProfile,
//   updateAdminProfile,
// } from '../controllers/adminController.js';

// import { AdminToken } from '../middlewares/authMiddleware.js';
// import upload from '../middlewares/upload.js';

// const router = express.Router();

// /* AUTH */
// router.post('/login', adminLogin);
// router.post('/forgot-password', adminForgotPassword);
// router.post('/verify-otp', verifyAdminOtp);
// router.post('/reset-password', adminResetPassword);

// /* ADMIN PROFILE (SINGLE) */
// router.get('/profile', AdminToken, getAdminProfile);
// router.put('/profile', AdminToken, upload.single('photo'), updateAdminProfile);

// export default router;
import express from 'express';
import multer from 'multer';
import { AdminToken } from '../middlewares/authMiddleware.js';
import {
  adminLogin,
  getAdminProfile,
  updateAdminProfile,
  changePassword,
} from '../controllers/adminController.js';

const router = express.Router();
const upload = multer(); // for file upload

// Login (no token needed)
router.post('/login', adminLogin);

// Get profile
router.get('/profile', AdminToken, getAdminProfile);

// Update profile (name, email, photo)
router.put('/profile', AdminToken, upload.single('photo'), updateAdminProfile);

// Change password
router.put('/change-password', AdminToken, changePassword);

export default router;
