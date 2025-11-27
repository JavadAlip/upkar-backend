import OngoingProjectsList from '../../models/ongoingPrjctPage/projectsListModel.js';
import { uploadImageToCloudinary } from '../../config/cloudinaryUpload.js';

export const createOngoingProject = async (req, res) => {
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

    const newProject = await OngoingProjectsList.create(data);
    res.status(201).json({ success: true, data: newProject });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllOngoingProjects = async (req, res) => {
  try {
    const all = await OngoingProjectsList.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: all });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateOngoingProject = async (req, res) => {
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

    const updated = await OngoingProjectsList.findByIdAndUpdate(id, data, {
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

export const deleteOngoingProject = async (req, res) => {
  try {
    const { id } = req.params;
    const del = await OngoingProjectsList.findByIdAndDelete(id);

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
