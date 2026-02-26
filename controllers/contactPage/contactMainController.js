import ContactMain from '../../models/contactPage/contactMain.js';
import { uploadImageToCloudinary } from '../../config/cloudinaryUpload.js';

/**
 * CREATE Contact Main
 * Only ONE document allowed
 */
export const createContactMain = async (req, res) => {
  try {
    let data = req.body;

    // Check if already exists
    const existing = await ContactMain.findOne();
    if (existing) {
      return res.status(400).json({
        success: false,
        message: 'Contact main section already exists. You can only update it.',
      });
    }

    // Upload image to Cloudinary
    if (req.file) {
      const imgRes = await uploadImageToCloudinary(
        req.file.buffer,
        'contact/main',
      );
      data.mainImage = imgRes.secure_url;
    }

    if (!data.mainImage) {
      return res.status(400).json({
        success: false,
        message: 'mainImage is required.',
      });
    }

    const newContactMain = await ContactMain.create(data);

    res.status(201).json({
      success: true,
      data: newContactMain,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * GET Contact Main (Single)
 */
export const getContactMain = async (req, res) => {
  try {
    const data = await ContactMain.findOne();

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * UPDATE Contact Main (No ID needed)
 * Always updates the single existing document
 */
export const updateContactMain = async (req, res) => {
  try {
    let data = req.body;

    const existing = await ContactMain.findOne();

    if (!existing) {
      return res.status(404).json({
        success: false,
        message: 'Contact main section not found',
      });
    }

    // Upload new image if provided
    if (req.file) {
      const imgRes = await uploadImageToCloudinary(
        req.file.buffer,
        'contact/main',
      );
      data.mainImage = imgRes.secure_url;
    }

    const updated = await ContactMain.findByIdAndUpdate(existing._id, data, {
      new: true,
    });

    res.status(200).json({
      success: true,
      data: updated,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * DELETE Contact Main
 */
export const deleteContactMain = async (req, res) => {
  try {
    const existing = await ContactMain.findOne();

    if (!existing) {
      return res.status(404).json({
        success: false,
        message: 'Contact main section not found',
      });
    }

    await ContactMain.findByIdAndDelete(existing._id);

    res.status(200).json({
      success: true,
      message: 'Deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
