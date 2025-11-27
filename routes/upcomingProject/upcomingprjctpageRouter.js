import express from 'express';
import { AdminToken } from '../../middlewares/authMiddleware.js';
import upload from '../../middlewares/upload.js';
import {
  createUpcomingProjectMain,
  getAllUpcomingProjectMain,
  updateUpcomingProjectMain,
  deleteUpcomingProjectMain,
} from '../../controllers/upcomingprjctPage/upcomingprjctmainController.js';
import {
  createUpcomingProject,
  getAllUpcomingProjects,
  updateUpcomingProject,
  deleteUpcomingProject,
} from '../../controllers/upcomingprjctPage/projectsListController.js';

const router = express.Router();

//project upcomoing main
router.post(
  '/create-upcomingprjct',
  AdminToken,
  upload.single('mainImage'),
  createUpcomingProjectMain
);

router.get('/get-all-upcomingprjcts', getAllUpcomingProjectMain);
router.put(
  '/update-upcomingprjct/:id',
  AdminToken,
  upload.single('mainImage'),
  updateUpcomingProjectMain
);
router.delete(
  '/delete-upcomingprjct/:id',
  AdminToken,
  deleteUpcomingProjectMain
);

// upcoming projects list
router.post(
  '/create-upcoming-projectlist',
  AdminToken,
  upload.single('projectImage'),
  createUpcomingProject
);
router.get('/get-all-upcoming-projectlists', getAllUpcomingProjects);
router.put(
  '/update-upcoming-projectlist/:id',
  AdminToken,
  upload.single('projectImage'),
  updateUpcomingProject
);
router.delete(
  '/delete-upcoming-projectlist/:id',
  AdminToken,
  deleteUpcomingProject
);

export default router;
