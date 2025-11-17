import CareerImages from "../../models/careersPage/careerImagesModel.js";
import { uploadImageToCloudinary } from "../../config/cloudinaryUpload.js";


export const createCareerImages = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "At least one image is required" });
    }

    const uploadedImages = [];
    for (const file of req.files) {
      const result = await uploadImageToCloudinary(file.buffer, "career-images");
      uploadedImages.push(result.secure_url);
    }

    const careerImages = await CareerImages.create({
      images: uploadedImages,
    });

    res.status(201).json({
      message: "Career images created successfully",
      careerImages,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};


export const getCareerImages = async (req, res) => {
  try {
    const careerImages = await CareerImages.find().sort({ createdAt: -1 });
    res.status(200).json(careerImages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const updateCareerImages = async (req, res) => {
  try {
    const { id } = req.params;

    const careerImages = await CareerImages.findById(id);
    if (!careerImages) {
      return res.status(404).json({ message: "CareerImages not found" });
    }

    if (req.files && req.files.length > 0) {
      const uploadedImages = [];
      for (const file of req.files) {
        const result = await uploadImageToCloudinary(file.buffer, "career-images");
        uploadedImages.push(result.secure_url);
      }
      careerImages.images = uploadedImages;
    }

    await careerImages.save();

    res.status(200).json({
      message: "Career images updated successfully",
      careerImages,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};


export const deleteCareerImages = async (req, res) => {
  try {
    const { id } = req.params;

    const careerImages = await CareerImages.findById(id);
    if (!careerImages) {
      return res.status(404).json({ message: "CareerImages not found" });
    }

    await CareerImages.deleteOne({ _id: id });

    res.status(200).json({ message: "Career images deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
