import Article from "../../models/blogPage/articleModel.js";
import { uploadImageToCloudinary } from "../../config/cloudinaryUpload.js";


export const createArticle = async (req, res) => {
  try {
    const { mainDescription } = req.body;

    if (!mainDescription) {
      return res.status(400).json({ success: false, message: "mainDescription is required." });
    }

    // MAIN IMAGE
    let mainImage = "";
    if (req.files?.mainImage?.[0]) {
      const imgRes = await uploadImageToCloudinary(
        req.files.mainImage[0].buffer,
        "articles/main"
      );
      mainImage = imgRes.secure_url;
    }

    // SUB ITEMS
    const subHeadings = req.body.subHeading || [];
    const subDescriptions = req.body.subDescription || [];
    const subImagesFiles = req.files?.subImages || [];

    const subItems = [];

    for (let i = 0; i < subHeadings.length; i++) {
      let subImg = "";

      if (subImagesFiles[i]?.buffer) {
        const imgRes = await uploadImageToCloudinary(
          subImagesFiles[i].buffer,
          "articles/sub"
        );
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

    return res.status(201).json({
      success: true,
      message: "Article created successfully",
      data: newArticle,
    });

  } catch (error) {
    console.error("Create Article Error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};



export const updateArticle = async (req, res) => {
  try {
    const { id } = req.params;

    const existing = await Article.findById(id);
    if (!existing)
      return res.status(404).json({ success: false, message: "Article not found" });

    const { mainDescription } = req.body;

    // MAIN IMAGE
    let mainImage = existing.mainImage;

    if (req.files?.mainImage?.[0]) {
      const imgRes = await uploadImageToCloudinary(
        req.files.mainImage[0].buffer,
        "articles/main"
      );
      mainImage = imgRes.secure_url;
    }

    // SUB ITEMS
    const subHeadings = req.body.subHeading || [];
    const subDescriptions = req.body.subDescription || [];
    const subImagesFiles = req.files?.subImages || [];

    const updatedSubItems = [];

    for (let i = 0; i < subHeadings.length; i++) {
      let finalSubImage = "";

      // CASE 1 → NEW IMAGE UPLOADED
      if (subImagesFiles[i]?.buffer) {
        const imgRes = await uploadImageToCloudinary(
          subImagesFiles[i].buffer,
          "articles/sub"
        );
        finalSubImage = imgRes.secure_url;
      }
      // CASE 2 → KEEP EXISTING IMAGE
      else if (
        existing.subItems[i]?.subImage &&
        existing.subItems[i].subImage !== "null"
      ) {
        finalSubImage = existing.subItems[i].subImage;
      }

      updatedSubItems.push({
        subHeading: subHeadings[i],
        subDescription: subDescriptions[i],
        subImage: finalSubImage, // ALWAYS a string
      });
    }

    // UPDATE DB
    const updated = await Article.findByIdAndUpdate(
      id,
      {
        mainImage,
        mainDescription,
        subItems: updatedSubItems,
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Article updated successfully",
      data: updated,
    });

  } catch (error) {
    console.error("Update Article Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const getAllArticles = async (req, res) => {
  try {
    const articles = await Article.find().sort({ createdAt: -1 });
    const cleaned = articles.map((a) => ({
      ...a._doc,
      subItems: a.subItems.map((s) => ({
        ...s._doc,
        subImage: s.subImage || "",
      })),
    }));

    return res.status(200).json({ success: true, data: cleaned });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};


export const deleteArticle = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Article.findByIdAndDelete(id);

    if (!deleted)
      return res.status(404).json({ success: false, message: "Article not found" });

    return res.status(200).json({ success: true, message: "Article deleted successfully" });

  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
