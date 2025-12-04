import VisionMission from '../../models/homePage/visionMissionModel.js';
import { uploadImageToCloudinary } from '../../config/cloudinaryUpload.js';

export const createVisionMission = async (req, res) => {
  try {
    const { description, missionText, visionText, totalExperience, stats } =
      req.body;

    if (!description || !missionText || !visionText || !totalExperience) {
      return res
        .status(400)
        .json({ message: 'All required fields are required' });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'Image is required' });
    }

    const result = await uploadImageToCloudinary(
      req.file.buffer,
      'vision-mission'
    );
    const parsedStats = stats ? JSON.parse(stats) : [];

    const visionMission = await VisionMission.create({
      description,
      missionText,
      visionText,
      totalExperience,
      image: result.secure_url,
      stats: parsedStats,
    });

    res.status(201).json({
      message: 'Vision & Mission created successfully',
      visionMission,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getVisionMission = async (req, res) => {
  try {
    const visionMissions = await VisionMission.find().sort({ createdAt: -1 });

    res.status(200).json(visionMissions);
  } catch (error) {
    console.error('Error fetching Vision & Mission:', error);
    res.status(500).json({ message: error.message });
  }
};

export const updateVisionMission = async (req, res) => {
  try {
    const { id } = req.params;
    const { description, missionText, visionText, totalExperience, stats } =
      req.body;

    const visionMission = await VisionMission.findById(id);
    if (!visionMission)
      return res.status(404).json({ message: 'Vision & Mission not found' });

    let imageURL = visionMission.image;

    if (req.file) {
      const result = await uploadImageToCloudinary(
        req.file.buffer,
        'vision-mission'
      );
      imageURL = result.secure_url;
    }

    const parsedStats = stats ? JSON.parse(stats) : visionMission.stats;

    visionMission.description = description;
    visionMission.missionText = missionText;
    visionMission.visionText = visionText;
    visionMission.totalExperience = totalExperience;
    visionMission.image = imageURL;
    visionMission.stats = parsedStats;

    await visionMission.save();

    res.status(200).json({
      message: 'Vision & Mission updated successfully',
      visionMission,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteVisionMission = async (req, res) => {
  try {
    const { id } = req.params;

    const visionMission = await VisionMission.findById(id);
    if (!visionMission)
      return res.status(404).json({ message: 'Vision & Mission not found' });

    await VisionMission.deleteOne({ _id: id });

    res.status(200).json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
