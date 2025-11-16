import express from 'express';
import { AdminToken } from '../../middlewares/authMiddleware.js';
import upload from '../../middlewares/upload.js';
import { createBanner, getBanners, deleteBanner, updateBanner } from '../../controllers/homePage/bannerController.js';
import { createOrUpdateVisionMission, getVisionMission, deleteVisionMission } from '../../controllers/homePage/visionMissionController.js';
import { createProject, getProjects, deleteProject, updateProject } from '../../controllers/homePage/projectController.js';
import { createCertification, getCertifications, deleteCertification } from '../../controllers/homePage/certificationController.js';
import { createQuestion, getQuestions, updateQuestion, deleteQuestion } from '../../controllers/homePage/questionController.js';
import { createAward, getAwards, updateAward, deleteAward } from '../../controllers/homePage/awardController.js';

const router = express.Router();

//banner
router.post('/create-banner', AdminToken, upload.single('image'), createBanner);  
router.get('/get-all-banners', getBanners);  
router.delete('/delete-banner/:id', AdminToken, deleteBanner); 
router.put('/edit-banner/:id', AdminToken, upload.single('image'), updateBanner); 

// vision-mission
router.post('/create-vision', AdminToken, upload.single('image'), createOrUpdateVisionMission);  
router.get('/get-all-visions', getVisionMission);  
router.delete('/delete-vision', AdminToken, deleteVisionMission);  

//projects
router.post('/create-project', AdminToken, upload.single('image'), createProject);  
router.get('/get-all-projects', getProjects);  
router.put('/update-project/:id', AdminToken, upload.single('image'), updateProject); 
router.delete('/delete-project/:id', AdminToken, deleteProject); 

//certification
router.post('/create-certificate', AdminToken, upload.single('icon'), createCertification); 
router.get('/get-all-certificates', getCertifications); 
router.delete('/delete-certificate/:id', AdminToken, deleteCertification); 

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

export default router;
