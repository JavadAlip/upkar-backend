import OurValues from "../../models/completedprjctPage/ourValuesModel.js";
import { uploadImageToCloudinary } from "../../config/cloudinaryUpload.js";

export const createValue = async (req, res) => {
  try {
    let data = req.body;

    if (req.file) {
      const imgRes = await uploadImageToCloudinary(req.file.buffer, "our-values");
      data.iconImage = imgRes.secure_url;
    }

    if (!data.iconImage) {
      return res.status(400).json({ success: false, message: "iconImage is required." });
    }

    const newValue = await OurValues.create(data);
    res.status(201).json({ success: true, data: newValue });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllValues = async (req, res) => {
  try {
    const all = await OurValues.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: all });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateValue = async (req, res) => {
  try {
    const { id } = req.params;
    let data = req.body;

    if (req.file) {
      const imgRes = await uploadImageToCloudinary(req.file.buffer, "our-values");
      data.iconImage = imgRes.secure_url;
    }

    const updated = await OurValues.findByIdAndUpdate(id, data, { new: true });

    if (!updated) {
      return res.status(404).json({ success: false, message: "Value not found" });
    }

    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteValue = async (req, res) => {
  try {
    const { id } = req.params;
    const del = await OurValues.findByIdAndDelete(id);

    if (!del) {
      return res.status(404).json({ success: false, message: "Value not found" });
    }

    res.status(200).json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
