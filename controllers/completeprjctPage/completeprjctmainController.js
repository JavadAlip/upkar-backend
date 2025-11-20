import CompletedProjectMain from "../../models/completedprjctPage/completedPrjctMain.js";
import { uploadImageToCloudinary } from "../../config/cloudinaryUpload.js";

export const createCompletedProjectMain = async (req, res) => {
  try {
    let data = req.body;

    if (req.file) {
      const imgRes = await uploadImageToCloudinary(req.file.buffer, "project/main");
      data.mainImage = imgRes.secure_url;
    }

    // Ensure mainImage is present
    if (!data.mainImage) {
      return res.status(400).json({ success: false, message: "mainImage is required." });
    }

    const newProject = await CompletedProjectMain.create(data);
    res.status(201).json({ success: true, data: newProject });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllCompletedProjectMain = async (req, res) => {
  try {
    const all = await CompletedProjectMain.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: all });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateCompletedProjectMain = async (req, res) => {
  try {
    const { id } = req.params;
    let data = req.body;

    // If a new image is uploaded, upload it to Cloudinary
    if (req.file) {
      const imgRes = await uploadImageToCloudinary(
        req.file.buffer,
        "project/main"
      );
      data.mainImage = imgRes.secure_url;
    }

    // Update the document
    const updated = await CompletedProjectMain.findByIdAndUpdate(id, data, {
      new: true,
    });

    if (!updated) {
      return res.status(404).json({ success: false, message: "Not found" });
    }

    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteCompletedProjectMain = async (req, res) => {
  try {
    const { id } = req.params;
    const del = await CompletedProjectMain.findByIdAndDelete(id);

    if (!del) {
      return res.status(404).json({ success: false, message: "Not found" });
    }

    res.status(200).json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
