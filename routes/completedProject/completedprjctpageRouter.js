import express from 'express';
import { AdminToken } from '../../middlewares/authMiddleware.js';
import upload from '../../middlewares/upload.js';
import {
  createCompletedProjectMain,
  getAllCompletedProjectMain,
  updateCompletedProjectMain,
  deleteCompletedProjectMain,
} from '../../controllers/completeprjctPage/completeprjctmainController.js';
import {
  createProject,
  getAllProjects,
  updateProject,
  deleteProject,
} from '../../controllers/completeprjctPage/projectsListController.js';
import {
  createValue,
  getAllValues,
  updateValue,
  deleteValue,
} from '../../controllers/completeprjctPage/ourValuesController.js';

import {
  createValueImage,
  getValueImages,
  updateValueImage,
  deleteValueImage,
} from '../../controllers/completeprjctPage/valueImageController.js';
const router = express.Router();

//project completed main
router.post(
  '/create-completeprjct',
  AdminToken,
  upload.single('mainImage'),
  createCompletedProjectMain
);

router.get('/get-all-completeprjcts', getAllCompletedProjectMain);
router.put(
  '/update-completeprjct/:id',
  AdminToken,
  upload.single('mainImage'),
  updateCompletedProjectMain
);
router.delete(
  '/delete-completeprjct/:id',
  AdminToken,
  deleteCompletedProjectMain
);

// projects list
router.post(
  '/create-projectlist',
  AdminToken,
  upload.single('projectImage'),
  createProject
);
router.get('/get-all-projectlists', getAllProjects);
router.put(
  '/update-projectlist/:id',
  AdminToken,
  upload.single('projectImage'),
  updateProject
);
router.delete('/delete-projectlist/:id', AdminToken, deleteProject);

// our values
router.post(
  '/create-ourvalues',
  AdminToken,
  upload.single('iconImage'),
  createValue
);
router.get('/get-all-ourvalues', getAllValues);
router.put(
  '/update-ourvalues/:id',
  AdminToken,
  upload.single('iconImage'),
  updateValue
);
router.delete('/delete-ourvalues/:id', AdminToken, deleteValue);

//value images
router.post(
  '/create-value-image',
  AdminToken,
  upload.single('image'),
  createValueImage
);

router.get('/get-value-images', getValueImages);
router.delete('/delete-value-image/:id', AdminToken, deleteValueImage);

router.put(
  '/update-value-image/:id',
  AdminToken,
  upload.single('image'),
  updateValueImage
);

export default router;
