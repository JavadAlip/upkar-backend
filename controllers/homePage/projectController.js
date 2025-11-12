import Project from '../../models/homePage/projectModel.js';
import { uploadImageToCloudinary } from '../../config/cloudinaryUpload.js';

// Create Project
export const createProject = async (req, res) => {
  try {
    const { type, heading, description, bulletPoints, boxMessage } = req.body;

    if (!type || !heading || !description || !bulletPoints || !boxMessage || !req.file) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Convert bulletPoints string to array if needed
    const bulletArray = typeof bulletPoints === 'string' ? bulletPoints.split(',') : bulletPoints;

    // Upload image to Cloudinary
    const result = await uploadImageToCloudinary(req.file.buffer, 'projects');

    const project = await Project.create({
      type,
      heading,
      description,
      bulletPoints: bulletArray,
      boxMessage,
      image: result.secure_url,
    });

    res.status(201).json({
      message: 'Project created successfully',
      project
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// Get Projects
export const getProjects = async (req, res) => {
  try {
    const { type } = req.query; 
    const filter = type ? { type } : {};
    const projects = await Project.find(filter).sort({ createdAt: -1 });
    res.status(200).json(projects);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// Update Project
export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: 'Project ID is required' });

    // Detect body type
    const { type, heading, description, bulletPoints, boxMessage } = req.body;

    let updatedFields = {};

    if (type) updatedFields.type = type;
    if (heading) updatedFields.heading = heading;
    if (description) updatedFields.description = description;
    if (boxMessage) updatedFields.boxMessage = boxMessage;

    if (bulletPoints) {
      updatedFields.bulletPoints = Array.isArray(bulletPoints)
        ? bulletPoints
        : bulletPoints.split(',');
    }

    // If image is sent via form-data
    if (req.file) { 
      const result = await uploadImageToCloudinary(req.file.buffer, 'projects');
      updatedFields.image = result.secure_url;
    }

    const updatedProject = await Project.findByIdAndUpdate(id, updatedFields, { new: true });
    if (!updatedProject) return res.status(404).json({ message: 'Project not found' });

    res.status(200).json({ message: 'Project updated successfully', project: updatedProject });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// Delete Project
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
