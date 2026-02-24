import BrandEthos from '../../models/homePage/brandEthosModel.js';
import { uploadImageToCloudinary } from '../../config/cloudinaryUpload.js';

// CREATE
export const createBrandEthos = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description || !req.file) {
      return res.status(400).json({
        message: 'Title, description and icon are required',
      });
    }

    const result = await uploadImageToCloudinary(req.file.buffer, 'brandEthos');

    const ethos = await BrandEthos.create({
      title,
      description,
      icon: result.secure_url,
    });

    res.status(201).json({
      message: 'Brand Ethos created successfully',
      ethos,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// UPDATE
export const updateBrandEthos = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    const ethos = await BrandEthos.findById(id);
    if (!ethos)
      return res.status(404).json({ message: 'Brand Ethos not found' });

    if (title) ethos.title = title;
    if (description) ethos.description = description;

    if (req.file) {
      const result = await uploadImageToCloudinary(
        req.file.buffer,
        'brandEthos',
      );
      ethos.icon = result.secure_url;
    }

    await ethos.save();

    res.status(200).json({
      message: 'Brand Ethos updated successfully',
      ethos,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// GET ALL
export const getBrandEthos = async (req, res) => {
  try {
    const ethos = await BrandEthos.find().sort({ createdAt: -1 });
    res.status(200).json(ethos);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// DELETE
export const deleteBrandEthos = async (req, res) => {
  try {
    const { id } = req.params;

    const ethos = await BrandEthos.findById(id);
    if (!ethos)
      return res.status(404).json({ message: 'Brand Ethos not found' });

    await BrandEthos.deleteOne({ _id: id });

    res.status(200).json({
      message: 'Brand Ethos deleted successfully',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
