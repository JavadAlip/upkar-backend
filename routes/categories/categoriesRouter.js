import express from 'express';
import { AdminToken } from '../../middlewares/authMiddleware.js';

import {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from '../../controllers/categories/categoriesController.js';

const router = express.Router();

router.post('/create-category', AdminToken, createCategory);
router.get('/get-all-categories', getAllCategories);
router.get('/get-category/:id', getCategoryById);
router.put('/update-category/:id', AdminToken, updateCategory);
router.delete('/delete-category/:id', AdminToken, deleteCategory);

export default router;
