import AboutMain from "../../models/aboutusPage/aboutusmainModel.js";
import { uploadImageToCloudinary } from "../../config/cloudinaryUpload.js";

export const createAboutMain = async (req, res) => {
  try {
    const data = req.body;

    if (req.files?.plotImage) {
      const plotRes = await uploadImageToCloudinary(req.files.plotImage[0].buffer, "aboutus/plot");
      data.plotImage = plotRes.secure_url;
    }

    if (req.files?.acresImage) {
      const acresRes = await uploadImageToCloudinary(req.files.acresImage[0].buffer, "aboutus/acres");
      data.acresImage = acresRes.secure_url;
    }

    if (req.files?.mainImages) {
      const mainImagesUrls = [];
      for (const file of req.files.mainImages) {
        const resCloud = await uploadImageToCloudinary(file.buffer, "aboutus/mainImages");
        mainImagesUrls.push(resCloud.secure_url);
      }
      data.mainImages = mainImagesUrls;
    }

    const aboutMain = await AboutMain.create(data);

    return res.status(201).json({
      success: true,
      message: "About Main created successfully",
      aboutMain,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const updateAboutMain = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;

    const aboutMain = await AboutMain.findById(id);
    if (!aboutMain) return res.status(404).json({ success: false, message: "About Main not found" });

    // Update plot image
    if (req.files?.plotImage) {
      const plotRes = await uploadImageToCloudinary(req.files.plotImage[0].buffer, "aboutus/plot");
      aboutMain.plotImage = plotRes.secure_url;
    }

    // Update acres image
    if (req.files?.acresImage) {
      const acresRes = await uploadImageToCloudinary(req.files.acresImage[0].buffer, "aboutus/acres");
      aboutMain.acresImage = acresRes.secure_url;
    }

    // Handle deleted existing images
    let deletedImages = data.deletedImages || [];
    if (!Array.isArray(deletedImages)) deletedImages = [deletedImages]; // if single string
    if (deletedImages.length) {
      aboutMain.mainImages = aboutMain.mainImages.filter(img => !deletedImages.includes(img));
    }

    // Upload new main images
    if (req.files?.mainImages) {
      for (const file of req.files.mainImages) {
        const resCloud = await uploadImageToCloudinary(file.buffer, "aboutus/mainImages");
        aboutMain.mainImages.push(resCloud.secure_url);
      }
    }

    // Update text fields
    const textFields = [
      "heading", "plotNumber", "plotTitle",
      "acresNumber", "acresTitle",
      "paragraph1", "paragraph2", "paragraph3"
    ];
    textFields.forEach(field => {
      if (data[field] !== undefined) aboutMain[field] = data[field];
    });

    await aboutMain.save();

    return res.status(200).json({ success: true, message: "About Main updated successfully", aboutMain });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, message: err.message });
  }
};


export const getAllAboutMain = async (req, res) => {
  try {
    const aboutMainList = await AboutMain.find();
    return res.status(200).json({ success: true, aboutMainList });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, message: err.message });
  }
};


export const deleteAboutMain = async (req, res) => {
  try {
    const deleted = await AboutMain.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, message: "About Main not found" });

    return res.status(200).json({ success: true, message: "About Main deleted successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, message: err.message });
  }
};
