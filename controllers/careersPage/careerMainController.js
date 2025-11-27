import CareerMain from '../../models/careersPage/careerMainModel.js';

export const createCareerMain = async (req, res) => {
  try {
    const { careerDescription } = req.body;

    if (!careerDescription) {
      return res
        .status(400)
        .json({ success: false, message: 'Career description is required' });
    }

    const data = await CareerMain.create({ careerDescription });

    res.status(201).json({
      success: true,
      message: 'Career main created successfully',
      data,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getAllCareerMain = async (req, res) => {
  try {
    const data = await CareerMain.find().sort({ createdAt: -1 });

    res.status(200).json({ success: true, data });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

export const updateCareerMain = async (req, res) => {
  try {
    const { id } = req.params;
    const { careerDescription } = req.body;

    const data = await CareerMain.findById(id);
    if (!data) {
      return res
        .status(404)
        .json({ success: false, message: 'Career main not found' });
    }

    if (careerDescription) data.careerDescription = careerDescription;

    await data.save();

    res.status(200).json({
      success: true,
      message: 'Career main updated successfully',
      data,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

export const deleteCareerMain = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await CareerMain.findById(id);
    if (!data) {
      return res
        .status(404)
        .json({ success: false, message: 'Career main not found' });
    }

    await CareerMain.deleteOne({ _id: id });

    res.status(200).json({
      success: true,
      message: 'Career main deleted successfully',
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: err.message });
  }
};
