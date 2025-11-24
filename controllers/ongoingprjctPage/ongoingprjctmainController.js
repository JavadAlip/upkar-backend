import OngoingProjectMain from "../../models/ongoingPrjctPage/ongoingPrjctMain.js";
import { uploadImageToCloudinary } from "../../config/cloudinaryUpload.js";

export const createOngoingProjectMain = async (req, res) => {
  try {
    let data = req.body;

    if (req.file) {
      const imgRes = await uploadImageToCloudinary(req.file.buffer, "project/main");
      data.mainImage = imgRes.secure_url;
    }

    if (!data.mainImage) {
      return res.status(400).json({ success: false, message: "mainImage is required." });
    }

    const newProject = await OngoingProjectMain.create(data);
    res.status(201).json({ success: true, data: newProject });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


export const getAllOngoingProjectMain = async (req, res) => {
  try {
    const all = await OngoingProjectMain.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: all });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateOngoingProjectMain = async (req, res) => {
  try {
    const { id } = req.params;
    let data = req.body;

    if (req.file) {
      const imgRes = await uploadImageToCloudinary(req.file.buffer, "project/main");
      data.mainImage = imgRes.secure_url;
    }

    const updated = await OngoingProjectMain.findByIdAndUpdate(id, data, { new: true });

    if (!updated) {
      return res.status(404).json({ success: false, message: "Not found" });
    }

    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteOngoingProjectMain = async (req, res) => {
  try {
    const { id } = req.params;
    const del = await OngoingProjectMain.findByIdAndDelete(id);

    if (!del) {
      return res.status(404).json({ success: false, message: "Not found" });
    }

    res.status(200).json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
