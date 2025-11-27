import ProjectsList from '../../models/upcomingPrjctPage/projectsListModel.js';
import { uploadImageToCloudinary } from '../../config/cloudinaryUpload.js';

export const createUpcomingProject = async (req, res) => {
  try {
    let data = req.body;

    if (req.file) {
      const imgRes = await uploadImageToCloudinary(
        req.file.buffer,
        'projects/list'
      );
      data.projectImage = imgRes.secure_url;
    }

    if (!data.projectImage) {
      return res
        .status(400)
        .json({ success: false, message: 'projectImage is required.' });
    }

    const newProject = await ProjectsList.create(data);
    res.status(201).json({ success: true, data: newProject });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllUpcomingProjects = async (req, res) => {
  try {
    const all = await ProjectsList.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: all });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateUpcomingProject = async (req, res) => {
  try {
    const { id } = req.params;
    let data = req.body;

    if (req.file) {
      const imgRes = await uploadImageToCloudinary(
        req.file.buffer,
        'projects/list'
      );
      data.projectImage = imgRes.secure_url;
    }

    const updated = await ProjectsList.findByIdAndUpdate(id, data, {
      new: true,
    });

    if (!updated) {
      return res
        .status(404)
        .json({ success: false, message: 'Project not found' });
    }

    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteUpcomingProject = async (req, res) => {
  try {
    const { id } = req.params;
    const del = await ProjectsList.findByIdAndDelete(id);

    if (!del) {
      return res
        .status(404)
        .json({ success: false, message: 'Project not found' });
    }

    res.status(200).json({ success: true, message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
