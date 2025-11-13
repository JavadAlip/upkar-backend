import express from 'express';
import { AdminToken } from '../../middlewares/authMiddleware.js';
import upload from '../../middlewares/upload.js';
import { createProject, getAllProjects, updateProject, deleteProject } from '../../controllers/projectPage/projectmainController.js';
import { createFeature, getFeature, updateFeature, deleteFeature } from '../../controllers/projectPage/featureController.js';
import { createOrUpdatePlotLayout, getPlotLayout, deletePlotLayout } from "../../controllers/projectPage/plotLayoutController.js";
import { createAmenity, getAmenities, updateAmenity, deleteAmenity } from '../../controllers/projectPage/amenitiesController.js';
import { createAboutProject, getAboutProjects, updateAboutProject, deleteAboutProject } from "../../controllers/projectPage/aboutProjectController.js";
import { createProjectImages, getProjectImages, updateProjectImages, deleteProjectImages } from "../../controllers/projectPage/projectImagesController.js";


const router = express.Router();

//projectMain
router.post('/create-projectmain', AdminToken, upload.array('mainImages', 3), createProject);
router.get('/get-all-projectmain', AdminToken, getAllProjects);
router.put('/edit-projectmain/:id', AdminToken, upload.array('mainImages', 3), updateProject);
router.delete('/delete-projectmain/:id', AdminToken, deleteProject);

//feature
router.post("/create-feature", AdminToken,
  upload.fields([
    { name: "mainImage", maxCount: 1 },
    { name: "icon1", maxCount: 1 },
    { name: "icon2", maxCount: 1 },
    { name: "icon3", maxCount: 1 },
  ]),
  createFeature
);
router.get("/get-all-features", AdminToken, getFeature);
router.put("/edit-feature/:id", AdminToken,
  upload.fields([
    { name: "mainImage", maxCount: 1 },
    { name: "icon1", maxCount: 1 },
    { name: "icon2", maxCount: 1 },
    { name: "icon3", maxCount: 1 },
  ]),
  updateFeature
);
router.delete("/delete-feature/:id", AdminToken, deleteFeature);

//plotLayout
router.post("/create-plot-layout", AdminToken,
  upload.fields([
    { name: "mainImage", maxCount: 1 },
    { name: "icons", maxCount: 10 },
  ]),
  createOrUpdatePlotLayout
);
router.get("/get-plot-layout", AdminToken, getPlotLayout);
router.delete("/delete-plot-layout", AdminToken, deletePlotLayout);

//Amenities
router.post('/create-amenity', AdminToken, upload.single('icon'), createAmenity);
router.get('/get-amenity', getAmenities);
router.put('/update-amenity/:id', AdminToken, upload.single('icon'), updateAmenity);
router.delete('/delete-amenity/:id', AdminToken, deleteAmenity);

//about projects
router.post("/create-about-project", AdminToken, createAboutProject);
router.get("/get-about-project", AdminToken, getAboutProjects);
router.put("/update-about-project/:id", AdminToken, updateAboutProject);
router.delete("/delete-about-project/:id", AdminToken, deleteAboutProject);

//project images
router.post("/create-project-images",AdminToken,upload.array("images"),createProjectImages);
router.get("/get-all-project-images", AdminToken, getProjectImages);
router.put("/edit-project-images/:id",AdminToken,upload.array("images"),updateProjectImages);
router.delete("/delete-project-images/:id", AdminToken, deleteProjectImages);

export default router;
