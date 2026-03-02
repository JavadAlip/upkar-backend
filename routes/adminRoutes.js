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
const upload = multer();

router.post('/login', adminLogin);
router.get('/profile', AdminToken, getAdminProfile);
router.put('/profile', AdminToken, upload.single('photo'), updateAdminProfile);
router.put('/change-password', AdminToken, changePassword);

export default router;
