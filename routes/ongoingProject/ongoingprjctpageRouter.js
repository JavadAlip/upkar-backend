import express from "express";
import { AdminToken } from "../../middlewares/authMiddleware.js";
import upload from "../../middlewares/upload.js";
import {createOngoingProjectMain,getAllOngoingProjectMain,updateOngoingProjectMain,deleteOngoingProjectMain} from "../../controllers/ongoingprjctPage/ongoingprjctmainController.js";
import {createOngoingProject,getAllOngoingProjects,updateOngoingProject,deleteOngoingProject} from "../../controllers/ongoingprjctPage/projectListController.js";

const router = express.Router();

//project completed main
router.post(
  "/create-ongoingprjct",
  AdminToken,
  upload.single("mainImage"), 
  createOngoingProjectMain
);

router.get("/get-all-ongoingprjcts", getAllOngoingProjectMain);
router.put(
  "/update-ongoingprjct/:id",
  AdminToken,
  upload.single("mainImage"),
  updateOngoingProjectMain
);
router.delete("/delete-ongoingprjct/:id", AdminToken, deleteOngoingProjectMain);

// ongoing projects list
router.post("/create-ongoing-projectlist", AdminToken, upload.single("projectImage"), createOngoingProject);
router.get("/get-all-ongoing-projectlists", getAllOngoingProjects);
router.put("/update-ongoing-projectlist/:id", AdminToken, upload.single("projectImage"), updateOngoingProject);
router.delete("/delete-ongoing-projectlist/:id", AdminToken, deleteOngoingProject);


export default router;
