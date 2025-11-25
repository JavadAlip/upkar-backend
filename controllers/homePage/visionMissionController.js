import VisionMission from '../../models/homePage/visionMissionModel.js';
import { uploadImageToCloudinary } from '../../config/cloudinaryUpload.js';

// Create or Update Vision & Mission
export const createOrUpdateVisionMission = async (req, res) => {
  try {
    const { description, missionText, visionText, totalExperience, stats } = req.body;

    // Required fields check
    if (!description || !missionText || !visionText || !totalExperience) {
      return res.status(400).json({ message: "All required fields must be provided" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    // Upload Image
    const result = await uploadImageToCloudinary(req.file.buffer, 'vision-mission');
    const parsedStats = stats ? JSON.parse(stats) : [];

    let visionMission = await VisionMission.findOne();

    if (visionMission) {
      visionMission.description = description;
      visionMission.missionText = missionText;
      visionMission.visionText = visionText;
      visionMission.totalExperience = totalExperience;
      visionMission.image = result.secure_url;
      visionMission.stats = parsedStats.length ? parsedStats : visionMission.stats;
      await visionMission.save();

      return res.status(200).json({ message: "Vision & Mission updated successfully", visionMission });
    }

    // Create New
    visionMission = await VisionMission.create({
      description,
      missionText,
      visionText,
      totalExperience,
      image: result.secure_url,
      stats: parsedStats
    });

    res.status(201).json({ message: "Vision & Mission created successfully", visionMission });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};


export const getVisionMission = async (req, res) => {
  try {
    const visionMission = await VisionMission.findOne();
    if (!visionMission) return res.status(404).json({ message: "No Vision & Mission found" });
    res.status(200).json(visionMission);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteVisionMission = async (req, res) => {
  try {
    const visionMission = await VisionMission.findOne();

    if (!visionMission) {
      return res.status(404).json({ message: "Vision & Mission not found" });
    }

    await VisionMission.deleteOne({ _id: visionMission._id });

    res.status(200).json({ message: "Vision & Mission deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
