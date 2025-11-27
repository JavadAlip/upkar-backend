import express from 'express';
import { AdminToken } from '../../middlewares/authMiddleware.js';
import {
  createCareerMain,
  getAllCareerMain,
  updateCareerMain,
  deleteCareerMain,
} from '../../controllers/careersPage/careerMainController.js';
import {
  createCareerImages,
  getCareerImages,
  updateCareerImages,
  deleteCareerImages,
} from '../../controllers/careersPage/careerImagesController.js';
import {
  createWhyJoinUs,
  getAllWhyJoinUs,
  updateWhyJoinUs,
  deleteWhyJoinUs,
} from '../../controllers/careersPage/whyJoinusController.js';
import upload from '../../middlewares/upload.js';
const router = express.Router();

//career main
router.post('/create-careermain', AdminToken, createCareerMain);
router.get('/get-all-careermain', getAllCareerMain);
router.put('/update-careermain/:id', AdminToken, updateCareerMain);
router.delete('/delete-careermain/:id', AdminToken, deleteCareerMain);

//career images
router.post(
  '/create-career-images',
  AdminToken,
  upload.array('images'),
  createCareerImages
);
router.get('/get-all-career-images', getCareerImages);
router.put(
  '/update-career-images/:id',
  AdminToken,
  upload.array('images'),
  updateCareerImages
);
router.delete('/delete-career-images/:id', AdminToken, deleteCareerImages);

//whyjoin
router.post('/create-whyjoin', AdminToken, createWhyJoinUs);
router.get('/get-all-whyjoin', getAllWhyJoinUs);
router.put('/update-whyjoin/:id', AdminToken, updateWhyJoinUs);
router.delete('/delete-whyjoin/:id', AdminToken, deleteWhyJoinUs);

export default router;
