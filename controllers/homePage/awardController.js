import Award from '../../models/homePage/awardModel.js';
import { uploadImageToCloudinary } from '../../config/cloudinaryUpload.js';

// Create Award
export const createAward = async (req, res) => {
  try {
    const { title } = req.body;

    if (!title || !req.file) {
      return res.status(400).json({ message: 'Title and image are required' });
    }

    const result = await uploadImageToCloudinary(req.file.buffer, 'awards');

    const award = await Award.create({
      title,
      image: result.secure_url
    });

    res.status(201).json({ message: 'Award created successfully', award });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// Get All Awards
export const getAwards = async (req, res) => {
  try {
    const awards = await Award.find().sort({ createdAt: -1 });
    res.status(200).json(awards);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// Update Award
export const updateAward = async (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;

    if (!id) return res.status(400).json({ message: 'Award ID is required' });

    const updateFields = {};
    if (title) updateFields.title = title;

    if (req.file) {
      const result = await uploadImageToCloudinary(req.file.buffer, 'awards');
      updateFields.image = result.secure_url;
    }

    const updatedAward = await Award.findByIdAndUpdate(id, updateFields, { new: true });
    if (!updatedAward) return res.status(404).json({ message: 'Award not found' });

    res.status(200).json({ message: 'Award updated successfully', award: updatedAward });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// Delete Award
export const deleteAward = async (req, res) => {
  try {
    const { id } = req.params;

    const award = await Award.findById(id);
    if (!award) return res.status(404).json({ message: 'Award not found' });

    await Award.deleteOne({ _id: id });

    res.status(200).json({ message: 'Award deleted successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
