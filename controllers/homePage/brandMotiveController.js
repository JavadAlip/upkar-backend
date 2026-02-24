import BrandMotive from '../../models/homePage/brandMotiveModel.js';

// CREATE
export const createBrandMotive = async (req, res) => {
  try {
    const { title, highlightText } = req.body;

    if (!title || !highlightText) {
      return res.status(400).json({
        message: 'Title and highlight text are required',
      });
    }

    const motive = await BrandMotive.create({
      title,
      highlightText,
    });

    res.status(201).json({
      message: 'Brand Motive created successfully',
      motive,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// UPDATE
export const updateBrandMotive = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, highlightText } = req.body;

    const motive = await BrandMotive.findById(id);
    if (!motive)
      return res.status(404).json({ message: 'Brand Motive not found' });

    if (title) motive.title = title;
    if (highlightText) motive.highlightText = highlightText;

    await motive.save();

    res.status(200).json({
      message: 'Brand Motive updated successfully',
      motive,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// GET ALL
export const getBrandMotive = async (req, res) => {
  try {
    const motive = await BrandMotive.find().sort({ createdAt: -1 });
    res.status(200).json(motive);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// DELETE
export const deleteBrandMotive = async (req, res) => {
  try {
    const { id } = req.params;

    const motive = await BrandMotive.findById(id);
    if (!motive)
      return res.status(404).json({ message: 'Brand Motive not found' });

    await BrandMotive.deleteOne({ _id: id });

    res.status(200).json({
      message: 'Brand Motive deleted successfully',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
