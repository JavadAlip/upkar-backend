import Article from "../../models/blogPage/articleModel.js";
import { uploadImageToCloudinary } from "../../config/cloudinaryUpload.js";

// ------------------- CREATE ARTICLE -------------------
export const createArticle = async (req, res) => {
  try {
    const { mainDescription } = req.body; 
    if (!mainDescription) {
      return res.status(400).json({ success: false, message: "mainDescription is required." });
    }

    // MAIN IMAGE
    let mainImage = null;
    if (req.files?.mainImage?.[0]) {
      const imgRes = await uploadImageToCloudinary(req.files.mainImage[0].buffer, "articles/main");
      mainImage = imgRes.secure_url;
    }

    // SUB ITEMS
    const subHeadings = req.body.subHeading || [];
    const subDescriptions = req.body.subDescription || [];
    const subImagesFiles = req.files?.subImages || [];

    const subItems = [];
    for (let i = 0; i < subHeadings.length; i++) {
      let subImg = null;
      if (subImagesFiles[i]?.buffer) {
        const imgRes = await uploadImageToCloudinary(subImagesFiles[i].buffer, "articles/sub");
        subImg = imgRes.secure_url;
      }
      subItems.push({
        subHeading: subHeadings[i],
        subDescription: subDescriptions[i],
        subImage: subImg,
      });
    }

    const newArticle = await Article.create({
      mainImage,
      mainDescription,
      subItems,
    });

    res.status(201).json({
      success: true,
      message: "Article created successfully",
      data: newArticle,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ------------------- UPDATE ARTICLE -------------------
export const updateArticle = async (req, res) => {
  try {
    const { id } = req.params;
    const { mainDescription } = req.body; // <-- match model

    // MAIN IMAGE
    let mainImage;
    if (req.files?.mainImage?.[0]) {
      const imgRes = await uploadImageToCloudinary(req.files.mainImage[0].buffer, "articles/main");
      mainImage = imgRes.secure_url;
    }

    // SUB ITEMS
    const subHeadings = req.body.subHeading || [];
    const subDescriptions = req.body.subDescription || [];
    const subImagesFiles = req.files?.subImages || [];

    const subItems = [];
    for (let i = 0; i < subHeadings.length; i++) {
      let subImg = null;
      if (subImagesFiles[i]?.buffer) {
        const imgRes = await uploadImageToCloudinary(subImagesFiles[i].buffer, "articles/sub");
        subImg = imgRes.secure_url;
      }
      subItems.push({
        subHeading: subHeadings[i],
        subDescription: subDescriptions[i],
        subImage: subImg,
      });
    }

    const updated = await Article.findByIdAndUpdate(
      id,
      {
        ...(mainImage && { mainImage }),
        mainDescription,
        subItems,
      },
      { new: true }
    );

    if (!updated) return res.status(404).json({ success: false, message: "Article not found" });

    res.status(200).json({
      success: true,
      message: "Article updated successfully",
      data: updated,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ------------------- GET ALL ARTICLES -------------------
export const getAllArticles = async (req, res) => {
  try {
    const articles = await Article.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: articles });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ------------------- DELETE ARTICLE -------------------
export const deleteArticle = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Article.findByIdAndDelete(id);

    if (!deleted) return res.status(404).json({ success: false, message: "Article not found" });

    res.status(200).json({ success: true, message: "Article deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
