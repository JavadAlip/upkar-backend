import express from 'express';
import { AdminToken } from '../../middlewares/authMiddleware.js';
import upload from '../../middlewares/upload.js';
import {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
} from '../../controllers/projects/projectController.js';

const router = express.Router();

router.post(
  '/create-project',
  AdminToken,
  upload.fields([
    { name: 'masterPlans', maxCount: 10 },
    { name: 'brochureImage', maxCount: 1 },
    { name: 'propertyImages', maxCount: 10 },
  ]),
  createProject
);

router.get('/get-all-projects', getAllProjects);
router.get('/get-project/:id', getProjectById);

router.put(
  '/update-project/:id',
  AdminToken,
  upload.fields([
    { name: 'masterPlans', maxCount: 10 },
    { name: 'brochureImage', maxCount: 1 },
    { name: 'propertyImages', maxCount: 10 },
  ]),
  updateProject
);

router.delete('/delete-project/:id', AdminToken, deleteProject);

export default router;
