import AboutImages from '../../models/aboutusPage/aboutImagesModel.js';
import { uploadImageToCloudinary } from '../../config/cloudinaryUpload.js';

export const createAboutImages = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res
        .status(400)
        .json({ message: 'At least one image is required' });
    }

    const uploadedImages = [];
    for (const file of req.files) {
      const result = await uploadImageToCloudinary(file.buffer, 'about-images');
      uploadedImages.push(result.secure_url);
    }

    const aboutImages = await AboutImages.create({
      images: uploadedImages,
    });

    res.status(201).json({
      message: 'About images created successfully',
      aboutImages,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const getAboutImages = async (req, res) => {
  try {
    const aboutImages = await AboutImages.find().sort({ createdAt: -1 });
    res.status(200).json(aboutImages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateAboutImages = async (req, res) => {
  try {
    const { id } = req.params;

    const aboutImages = await AboutImages.findById(id);
    if (!aboutImages) {
      return res.status(404).json({ message: 'AboutImages not found' });
    }

    if (req.files && req.files.length > 0) {
      const uploadedImages = [];
      for (const file of req.files) {
        const result = await uploadImageToCloudinary(
          file.buffer,
          'about-images'
        );
        uploadedImages.push(result.secure_url);
      }
      aboutImages.images = uploadedImages;
    }

    await aboutImages.save();

    res.status(200).json({
      message: 'About images updated successfully',
      aboutImages,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const deleteAboutImages = async (req, res) => {
  try {
    const { id } = req.params;

    const aboutImages = await AboutImages.findById(id);
    if (!aboutImages) {
      return res.status(404).json({ message: 'AboutImages not found' });
    }

    await AboutImages.deleteOne({ _id: id });

    res.status(200).json({ message: 'About images deleted successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
