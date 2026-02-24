import express from 'express';
import { AdminToken } from '../../middlewares/authMiddleware.js';
import upload from '../../middlewares/upload.js';
import {
  createBanner,
  getBanners,
  deleteBanner,
  updateBanner,
} from '../../controllers/homePage/bannerController.js';
import {
  createVisionMission,
  updateVisionMission,
  getVisionMission,
  deleteVisionMission,
} from '../../controllers/homePage/visionMissionController.js';
import {
  createProject,
  getProjects,
  deleteProject,
  updateProject,
} from '../../controllers/homePage/projectController.js';
import {
  createCertification,
  updateCertification,
  getCertifications,
  deleteCertification,
} from '../../controllers/homePage/certificationController.js';
import {
  createQuote,
  getAllQuotes,
  updateQuote,
  deleteQuote,
} from '../../controllers/homePage/quoteController.js';
import {
  createQuestion,
  getQuestions,
  updateQuestion,
  deleteQuestion,
} from '../../controllers/homePage/questionController.js';
import {
  createAward,
  getAwards,
  updateAward,
  deleteAward,
} from '../../controllers/homePage/awardController.js';
import {
  createTreeSection,
  getTreeSections,
  updateTreeSection,
  deleteTreeSection,
} from '../../controllers/homePage/treeSectionController.js';

import {
  createEnquiry,
  getAllEnquiries,
  deleteEnquiry,
} from '../../controllers/homePage/enquiryController.js';

import {
  createBrandEthos,
  updateBrandEthos,
  getBrandEthos,
  deleteBrandEthos,
} from '../../controllers/homePage/brandEthosController.js';

import {
  createBrandMotive,
  updateBrandMotive,
  getBrandMotive,
  deleteBrandMotive,
} from '../../controllers/homePage/brandMotiveController.js';

const router = express.Router();

//banner
router.post('/create-banner', AdminToken, upload.single('image'), createBanner);
router.get('/get-all-banners', getBanners);
router.delete('/delete-banner/:id', AdminToken, deleteBanner);
router.put(
  '/edit-banner/:id',
  AdminToken,
  upload.single('image'),
  updateBanner,
);

// vision-mission
router.post(
  '/create-vision',
  AdminToken,
  upload.single('image'),
  createVisionMission,
);

router.put(
  '/update-vision/:id',
  AdminToken,
  upload.single('image'),
  updateVisionMission,
);

router.get('/get-all-visions', getVisionMission);

router.delete('/delete-vision/:id', AdminToken, deleteVisionMission);

//projects
router.post(
  '/create-project',
  AdminToken,
  upload.single('image'),
  createProject,
);
router.get('/get-all-projects', getProjects);
router.put(
  '/update-project/:id',
  AdminToken,
  upload.single('image'),
  updateProject,
);
router.delete('/delete-project/:id', AdminToken, deleteProject);

//certification
router.post(
  '/create-certificate',
  AdminToken,
  upload.single('icon'),
  createCertification,
);
router.put(
  '/update-certificate/:id',
  AdminToken,
  upload.single('icon'),
  updateCertification,
);
router.get('/get-all-certificates', getCertifications);
router.delete('/delete-certificate/:id', AdminToken, deleteCertification);

//quote
router.post('/create-quote', AdminToken, createQuote);
router.get('/get-all-quotes', getAllQuotes);
router.put('/update-quote/:id', AdminToken, updateQuote);
router.delete('/delete-quote/:id', AdminToken, deleteQuote);

//qustion-answers
router.post('/create-qn', AdminToken, createQuestion);
router.get('/get-all-qns', getQuestions);
router.put('/update-qn/:id', AdminToken, updateQuestion);
router.delete('/delete-qn/:id', AdminToken, deleteQuestion);

//awards
router.post('/create-award', AdminToken, upload.single('image'), createAward);
router.get('/get-all', getAwards);
router.put('/update/:id', AdminToken, upload.single('image'), updateAward);
router.delete('/delete/:id', AdminToken, deleteAward);

//tree
router.post(
  '/create-tree',
  AdminToken,
  upload.single('image'),
  createTreeSection,
);
router.get('/get-all-tree', getTreeSections);
router.put(
  '/update-tree/:id',
  AdminToken,
  upload.single('image'),
  updateTreeSection,
);
router.delete('/delete-tree/:id', AdminToken, deleteTreeSection);

// project enquiry
router.post('/create-enquiry', createEnquiry);
router.get('/all-enquiry', getAllEnquiries);
router.delete('/delete-enquiry/:id', AdminToken, deleteEnquiry);

// Brand Ethos Routes
router.post(
  '/create-brand-ethos',
  AdminToken,
  upload.single('icon'),
  createBrandEthos,
);
router.put(
  '/update-brand-ethos/:id',
  AdminToken,
  upload.single('icon'),
  updateBrandEthos,
);
router.get('/get-all-brand-ethos', getBrandEthos);
router.delete('/delete-brand-ethos/:id', AdminToken, deleteBrandEthos);

// Brand Motive Routes
router.post('/create-brand-motive', AdminToken, createBrandMotive);

router.put('/update-brand-motive/:id', AdminToken, updateBrandMotive);

router.get('/get-all-brand-motive', getBrandMotive);

router.delete('/delete-brand-motive/:id', AdminToken, deleteBrandMotive);

export default router;
