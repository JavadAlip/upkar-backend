import ReadMore from '../../models/blogPage/readMoreModel.js';
import { uploadImageToCloudinary } from '../../config/cloudinaryUpload.js';

export const createReadMore = async (req, res) => {
  try {
    const { description } = req.body;

    let mainImage = null;
    if (req.file) {
      const imgRes = await uploadImageToCloudinary(
        req.file.buffer,
        'readmore/main'
      );
      mainImage = imgRes.secure_url;
    }

    if (!mainImage) {
      return res
        .status(400)
        .json({ success: false, message: 'mainImage is required.' });
    }

    const newReadMore = await ReadMore.create({ mainImage, description });

    res.status(201).json({
      success: true,
      message: 'ReadMore created successfully',
      data: newReadMore,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllReadMore = async (req, res) => {
  try {
    const all = await ReadMore.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: all });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateReadMore = async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;

    let mainImage;
    if (req.file) {
      const imgRes = await uploadImageToCloudinary(
        req.file.buffer,
        'readmore/main'
      );
      mainImage = imgRes.secure_url;
    }

    const updated = await ReadMore.findByIdAndUpdate(
      id,
      { ...(mainImage && { mainImage }), description },
      { new: true }
    );

    if (!updated)
      return res
        .status(404)
        .json({ success: false, message: 'ReadMore not found' });

    res.status(200).json({
      success: true,
      message: 'ReadMore updated successfully',
      data: updated,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteReadMore = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await ReadMore.findByIdAndDelete(id);

    if (!deleted)
      return res
        .status(404)
        .json({ success: false, message: 'ReadMore not found' });

    res.status(200).json({
      success: true,
      message: 'ReadMore deleted successfully',
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
