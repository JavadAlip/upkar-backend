import VisionMission from '../../models/homePage/visionMissionModel.js';
import { uploadImageToCloudinary } from '../../config/cloudinaryUpload.js';

// Create or Update Vision & Mission
export const createOrUpdateVisionMission = async (req, res) => {
  try {
    const { description, missionText, visionText, stats } = req.body;

    // Check required fields
    if (!description || !missionText || !visionText || !req.file) {
      return res.status(400).json({ message: "All required fields must be provided" });
    }

    // Upload image to Cloudinary
    const result = await uploadImageToCloudinary(req.file.buffer, 'vision-mission');

    // Parse stats if sent as JSON string
    const parsedStats = stats ? JSON.parse(stats) : [];

    let visionMission = await VisionMission.findOne();

    if (visionMission) {
      visionMission.description = description;
      visionMission.missionText = missionText;
      visionMission.visionText = visionText;
      visionMission.image = result.secure_url; // Cloudinary URL
      visionMission.stats = parsedStats.length ? parsedStats : visionMission.stats;
      await visionMission.save();
      return res.status(200).json({ message: "Vision & Mission updated successfully", visionMission });
    }

    visionMission = await VisionMission.create({
      description,
      missionText,
      visionText,
      image: result.secure_url,
      stats: parsedStats
    });

    res.status(201).json({ message: "Vision & Mission created successfully", visionMission });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// Public GET API
export const getVisionMission = async (req, res) => {
  try {
    const visionMission = await VisionMission.findOne();
    if (!visionMission) return res.status(404).json({ message: "No Vision & Mission found" });
    res.status(200).json(visionMission);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Vision & Mission
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
