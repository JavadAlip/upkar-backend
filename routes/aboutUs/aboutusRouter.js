import express from "express";
import { AdminToken } from "../../middlewares/authMiddleware.js";
import upload from "../../middlewares/upload.js";
import { createAboutMain, updateAboutMain, getAllAboutMain, deleteAboutMain } from "../../controllers/aboutusPage/aboutusmainController.js";
import { createQuote, getAllQuotes, updateQuote, deleteQuote } from "../../controllers/aboutusPage/quoteController.js";
import { createTeamMember, getAllTeamMembers, updateTeamMember, deleteTeamMember } from "../../controllers/aboutusPage/teamController.js";

const router = express.Router();

//aboutmain
router.post(
    "/create-aboutmain",
    AdminToken,
    upload.fields([
        { name: "plotImage", maxCount: 1 },
        { name: "acresImage", maxCount: 1 },
        { name: "mainImages" },
    ]),
    createAboutMain
);
router.put(
    "/update-aboutmain/:id",
    AdminToken,
    upload.fields([
        { name: "plotImage", maxCount: 1 },
        { name: "acresImage", maxCount: 1 },
        { name: "mainImages" },
    ]),
    updateAboutMain
);
router.get("/get-all-aboutmain", getAllAboutMain);
router.delete("/delete-aboutmain/:id", AdminToken, deleteAboutMain);

//quote
router.post("/create-quote", AdminToken, createQuote);
router.get("/get-all-quotes", getAllQuotes);
router.put("/update-quote/:id", AdminToken, updateQuote);
router.delete("/delete-quote/:id", AdminToken, deleteQuote);

//team
router.post(
  "/create-team",
  AdminToken,
  upload.single("memberImage"), 
  createTeamMember
);
router.get("/get-all-team", getAllTeamMembers);
router.put(
  "/update-team/:id",
  AdminToken,
  upload.single("memberImage"), 
  updateTeamMember
);
router.delete("/delete-team/:id", AdminToken, deleteTeamMember);


export default router;
