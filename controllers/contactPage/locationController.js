import Location from '../../models/contactPage/locationModel.js';

/**
 * CREATE Location
 */
export const createLocation = async (req, res) => {
  try {
    const data = req.body;

    if (!data.title || !data.locationUrl) {
      return res.status(400).json({
        success: false,
        message: 'Title and locationUrl are required.',
      });
    }

    const newLocation = await Location.create(data);

    res.status(201).json({
      success: true,
      data: newLocation,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * GET All Locations
 */
export const getAllLocations = async (req, res) => {
  try {
    const locations = await Location.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: locations,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * UPDATE Location
 */
export const updateLocation = async (req, res) => {
  try {
    const { id } = req.params;

    const updated = await Location.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: 'Location not found',
      });
    }

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
 * DELETE Location
 */
export const deleteLocation = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Location.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Location not found',
      });
    }

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
