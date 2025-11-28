import ValueImage from '../../models/completedprjctPage/ValueImage.js';
import { uploadImageToCloudinary } from '../../config/cloudinaryUpload.js';

export const createValueImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Image is required' });
    }

    const result = await uploadImageToCloudinary(
      req.file.buffer,
      'valueImages'
    );

    const valueImage = await ValueImage.create({
      image: result.secure_url,
    });

    res.status(201).json({
      message: 'Value image created successfully',
      valueImage,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const getValueImages = async (req, res) => {
  try {
    const images = await ValueImage.find().sort({ createdAt: -1 });
    res.status(200).json(images);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateValueImage = async (req, res) => {
  try {
    const { id } = req.params;

    const valueImage = await ValueImage.findById(id);
    if (!valueImage) {
      return res.status(404).json({ message: 'Value image not found' });
    }

    if (req.file) {
      const result = await uploadImageToCloudinary(
        req.file.buffer,
        'valueImages'
      );
      valueImage.image = result.secure_url;
    }

    await valueImage.save();

    res.status(200).json({
      message: 'Value image updated successfully',
      valueImage,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const deleteValueImage = async (req, res) => {
  try {
    const { id } = req.params;

    const valueImage = await ValueImage.findById(id);
    if (!valueImage) {
      return res.status(404).json({ message: 'Value image not found' });
    }

    await ValueImage.deleteOne({ _id: id });

    res.status(200).json({ message: 'Value image deleted successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
