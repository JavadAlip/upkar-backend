import WhyJoinUs from '../../models/careersPage/whyJoinUsmodel.js';

export const createWhyJoinUs = async (req, res) => {
  try {
    const { title, description } = req.body;

    const newData = await WhyJoinUs.create({ title, description });

    res.status(201).json({
      success: true,
      message: 'Why Join Us added successfully',
      data: newData,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllWhyJoinUs = async (req, res) => {
  try {
    const data = await WhyJoinUs.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateWhyJoinUs = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedData = await WhyJoinUs.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedData) {
      return res.status(404).json({
        success: false,
        message: 'Why Join Us item not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Why Join Us updated successfully',
      data: updatedData,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteWhyJoinUs = async (req, res) => {
  try {
    const { id } = req.params;

    await WhyJoinUs.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: 'Why Join Us deleted successfully',
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
