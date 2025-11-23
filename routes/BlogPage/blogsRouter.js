import express from "express";
import { AdminToken } from "../../middlewares/authMiddleware.js";
import upload from "../../middlewares/upload.js";
import {createBlogMain, getAllBlogMain, updateBlogMain, deleteBlogMain} from "../../controllers/blogsPage/blogMainController.js";
import {createArticle, getAllArticles, updateArticle,deleteArticle} from "../../controllers/blogsPage/articleController.js";
import { createReadMore, getAllReadMore, updateReadMore, deleteReadMore } from "../../controllers/blogsPage/readMoreController.js";

const router = express.Router();

// Blog Main 
router.post("/create-blogmain", AdminToken, upload.single("mainImage"), createBlogMain);
router.get("/get-all-blogmain", getAllBlogMain);
router.put("/update-blogmain/:id", AdminToken, upload.single("mainImage"), updateBlogMain);
router.delete("/delete-blogmain/:id", AdminToken, deleteBlogMain);

// Top articles
router.post(
  "/create-article",
  AdminToken,
  upload.fields([
    { name: "mainImage", maxCount: 1 },
    { name: "subImages", maxCount: 20 },
  ]),
  createArticle
);

router.get("/get-all-articles", getAllArticles);

router.put(
  "/update-article/:id",
  AdminToken,
  upload.fields([
    { name: "mainImage", maxCount: 1 },
    { name: "subImages", maxCount: 20 },
  ]),
  updateArticle
);
router.delete("/delete-article/:id", AdminToken, deleteArticle);


//ReadMore
router.post("/create-readmore", AdminToken, upload.single("mainImage"), createReadMore);
router.get("/get-all-readmore", getAllReadMore);
router.put("/update-readmore/:id", AdminToken, upload.single("mainImage"), updateReadMore);
router.delete("/delete-readmore/:id", AdminToken, deleteReadMore);

export default router;
