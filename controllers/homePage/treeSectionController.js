import TreeSection from '../../models/homePage/treeSectionModel.js';
import { uploadImageToCloudinary } from '../../config/cloudinaryUpload.js';

export const createTreeSection = async (req, res) => {
  try {
    const { heading1, heading2, description } = req.body;

    if (!heading1 || !description || !req.file) {
      return res.status(400).json({
        message: 'Heading1, Description and Image are required',
      });
    }

    const result = await uploadImageToCloudinary(
      req.file.buffer,
      'treeSection'
    );

    const treeSection = await TreeSection.create({
      heading1,
      heading2,
      description,
      image: result.secure_url,
    });

    res.status(201).json({
      message: 'Tree section created successfully',
      treeSection,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const getTreeSections = async (req, res) => {
  try {
    const sections = await TreeSection.find().sort({ createdAt: -1 });
    res.status(200).json(sections);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateTreeSection = async (req, res) => {
  try {
    const { id } = req.params;
    const { heading1, heading2, description } = req.body;

    const section = await TreeSection.findById(id);
    if (!section) {
      return res.status(404).json({ message: 'Tree section not found' });
    }

    if (req.file) {
      const result = await uploadImageToCloudinary(
        req.file.buffer,
        'treeSection'
      );
      section.image = result.secure_url;
    }

    if (heading1) section.heading1 = heading1;
    if (heading2) section.heading2 = heading2;
    if (description) section.description = description;

    await section.save();

    res.status(200).json({
      message: 'Tree section updated successfully',
      section,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const deleteTreeSection = async (req, res) => {
  try {
    const { id } = req.params;

    const section = await TreeSection.findById(id);
    if (!section) {
      return res.status(404).json({ message: 'Tree section not found' });
    }

    await TreeSection.deleteOne({ _id: id });

    res.status(200).json({ message: 'Tree section deleted successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
