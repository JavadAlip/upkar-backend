import Feature from "../../models/projectPage/featureModel.js";
import { uploadImageToCloudinary } from "../../config/cloudinaryUpload.js";


//  Create Feature
//  Only one main image + up to 3 icons

export const createFeature = async (req, res) => {
  try {
    const { description, iconTitle1, iconTitle2, iconTitle3 } = req.body;

    if (!description || !req.files?.mainImage) {
      return res.status(400).json({ message: "Description and main image are required" });
    }

    // Upload main image
    const mainImageResult = await uploadImageToCloudinary(
      req.files.mainImage[0].buffer,
      "features/main"
    );

    const icons = [];

    // Upload each icon if present
    if (req.files.icon1 && iconTitle1) {
      const icon1Res = await uploadImageToCloudinary(req.files.icon1[0].buffer, "features/icons");
      icons.push({ icon: icon1Res.secure_url, iconTitle: iconTitle1 });
    }
    if (req.files.icon2 && iconTitle2) {
      const icon2Res = await uploadImageToCloudinary(req.files.icon2[0].buffer, "features/icons");
      icons.push({ icon: icon2Res.secure_url, iconTitle: iconTitle2 });
    }
    if (req.files.icon3 && iconTitle3) {
      const icon3Res = await uploadImageToCloudinary(req.files.icon3[0].buffer, "features/icons");
      icons.push({ icon: icon3Res.secure_url, iconTitle: iconTitle3 });
    }

    const feature = await Feature.create({
      description,
      mainImage: mainImageResult.secure_url,
      icons,
    });

    res.status(201).json({
      message: "Feature created successfully",
      feature,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// Get All Features
export const getFeature = async (req, res) => {
  try {
    const features = await Feature.find().sort({ createdAt: -1 });
    res.status(200).json(features);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Update Feature
export const updateFeature = async (req, res) => {
  try {
    const { id } = req.params;
    const { description, iconTitle1, iconTitle2, iconTitle3 } = req.body;

    const feature = await Feature.findById(id);
    if (!feature) return res.status(404).json({ message: "Feature not found" });

    if (description) feature.description = description;

    // Update main image
    if (req.files?.mainImage) {
      const result = await uploadImageToCloudinary(req.files.mainImage[0].buffer, "features/main");
      feature.mainImage = result.secure_url;
    }

    // Replace icons if new ones uploaded
    const icons = [];
    if (req.files.icon1 && iconTitle1) {
      const icon1Res = await uploadImageToCloudinary(req.files.icon1[0].buffer, "features/icons");
      icons.push({ icon: icon1Res.secure_url, iconTitle: iconTitle1 });
    }
    if (req.files.icon2 && iconTitle2) {
      const icon2Res = await uploadImageToCloudinary(req.files.icon2[0].buffer, "features/icons");
      icons.push({ icon: icon2Res.secure_url, iconTitle: iconTitle2 });
    }
    if (req.files.icon3 && iconTitle3) {
      const icon3Res = await uploadImageToCloudinary(req.files.icon3[0].buffer, "features/icons");
      icons.push({ icon: icon3Res.secure_url, iconTitle: iconTitle3 });
    }

    if (icons.length > 0) feature.icons = icons;

    await feature.save();
    res.status(200).json({ message: "Feature updated successfully", feature });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};


//  Delete Feature
export const deleteFeature = async (req, res) => {
  try {
    const { id } = req.params;
    const feature = await Feature.findById(id);
    if (!feature) return res.status(404).json({ message: "Feature not found" });

    await Feature.deleteOne({ _id: id });
    res.status(200).json({ message: "Feature deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
