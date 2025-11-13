import ProjectImages from "../../models/projectPage/projectImagesModel.js";
import { uploadImageToCloudinary } from "../../config/cloudinaryUpload.js";

// Create ProjectImages
export const createProjectImages = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "At least one image is required" });
    }

    // Upload all images to Cloudinary
    const uploadedImages = [];
    for (const file of req.files) {
      const result = await uploadImageToCloudinary(file.buffer, "project-images");
      uploadedImages.push(result.secure_url);
    }

    // Save URLs in DB
    const projectImages = await ProjectImages.create({
      images: uploadedImages,
    });

    res.status(201).json({
      message: "Project images created successfully",
      projectImages,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// Get all ProjectImages
export const getProjectImages = async (req, res) => {
  try {
    const projectImages = await ProjectImages.find().sort({ createdAt: -1 });
    res.status(200).json(projectImages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update ProjectImages by ID
export const updateProjectImages = async (req, res) => {
  try {
    const { id } = req.params;

    const projectImages = await ProjectImages.findById(id);
    if (!projectImages) {
      return res.status(404).json({ message: "ProjectImages not found" });
    }

    // If new files uploaded → upload to Cloudinary
    if (req.files && req.files.length > 0) {
      const uploadedImages = [];
      for (const file of req.files) {
        const result = await uploadImageToCloudinary(file.buffer, "project-images");
        uploadedImages.push(result.secure_url);
      }
      projectImages.images = uploadedImages;
    }

    await projectImages.save();

    res.status(200).json({
      message: "Project images updated successfully",
      projectImages,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// Delete ProjectImages by ID
export const deleteProjectImages = async (req, res) => {
  try {
    const { id } = req.params;

    const projectImages = await ProjectImages.findById(id);
    if (!projectImages) {
      return res.status(404).json({ message: "ProjectImages not found" });
    }

    await ProjectImages.deleteOne({ _id: id });

    res.status(200).json({ message: "Project images deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
