import Project from '../../models/projectPage/projectmainModel.js';
import { uploadImageToCloudinary } from '../../config/cloudinaryUpload.js';

export const createProject = async (req, res) => {
  try {
    const {
      heading,
      description,
      customerHeading,
      customerDescription,
      ratingText,
    } = req.body;

    if (!req.files || req.files.length !== 3) {
      return res
        .status(400)
        .json({ message: 'Exactly 3 main images are required' });
    }

    const uploadedImages = [];
    for (const file of req.files) {
      const result = await uploadImageToCloudinary(file.buffer, 'projects');
      uploadedImages.push(result.secure_url);
    }

    const project = await Project.create({
      heading,
      description,
      mainImages: uploadedImages,
      customerHeading,
      customerDescription,
      ratingText,
    });

    res.status(201).json({
      message: 'Project created successfully',
      project,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.status(200).json(projects);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      heading,
      description,
      customerHeading,
      customerDescription,
      ratingText,
    } = req.body;

    const project = await Project.findById(id);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    if (req.files && req.files.length > 0) {
      const uploadedImages = [];
      for (const file of req.files) {
        const result = await uploadImageToCloudinary(file.buffer, 'projects');
        uploadedImages.push(result.secure_url);
      }
      project.mainImages = uploadedImages;
    }

    if (heading) project.heading = heading;
    if (description) project.description = description;
    if (customerHeading) project.customerHeading = customerHeading;
    if (customerDescription) project.customerDescription = customerDescription;
    if (ratingText) project.ratingText = ratingText;

    await project.save();

    res.status(200).json({
      message: 'Project updated successfully',
      project,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: 'Project ID is required' });

    const project = await Project.findById(id);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    await Project.deleteOne({ _id: id });

    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
