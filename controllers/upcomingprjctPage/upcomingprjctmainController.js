import UpcomingProjectMain from '../../models/upcomingPrjctPage/upcomingPrjctMain.js';
import { uploadImageToCloudinary } from '../../config/cloudinaryUpload.js';

export const createUpcomingProjectMain = async (req, res) => {
  try {
    let data = req.body;

    if (req.file) {
      const imgRes = await uploadImageToCloudinary(
        req.file.buffer,
        'project/main'
      );
      data.mainImage = imgRes.secure_url;
    }

    if (!data.mainImage) {
      return res
        .status(400)
        .json({ success: false, message: 'mainImage is required.' });
    }

    const newProject = await UpcomingProjectMain.create(data);
    res.status(201).json({ success: true, data: newProject });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllUpcomingProjectMain = async (req, res) => {
  try {
    const all = await UpcomingProjectMain.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: all });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateUpcomingProjectMain = async (req, res) => {
  try {
    const { id } = req.params;
    let data = req.body;

    if (req.file) {
      const imgRes = await uploadImageToCloudinary(
        req.file.buffer,
        'project/main'
      );
      data.mainImage = imgRes.secure_url;
    }

    const updated = await UpcomingProjectMain.findByIdAndUpdate(id, data, {
      new: true,
    });

    if (!updated) {
      return res.status(404).json({ success: false, message: 'Not found' });
    }

    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteUpcomingProjectMain = async (req, res) => {
  try {
    const { id } = req.params;
    const del = await UpcomingProjectMain.findByIdAndDelete(id);

    if (!del) {
      return res.status(404).json({ success: false, message: 'Not found' });
    }

    res.status(200).json({ success: true, message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
