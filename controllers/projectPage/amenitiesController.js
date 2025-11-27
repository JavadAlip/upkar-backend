import Amenity from '../../models/projectPage/amenitiesModel.js';
import { uploadImageToCloudinary } from '../../config/cloudinaryUpload.js';

export const createAmenity = async (req, res) => {
  try {
    const { heading } = req.body;

    if (!heading || !req.file) {
      return res.status(400).json({ message: 'Heading and icon are required' });
    }

    const result = await uploadImageToCloudinary(req.file.buffer, 'amenities');

    const amenity = await Amenity.create({
      heading,
      icon: result.secure_url,
    });

    res.status(201).json({
      message: 'Amenity created successfully',
      amenity,
    });
  } catch (error) {
    console.log('Error in createAmenity:', error);
    res.status(500).json({ message: error.message });
  }
};

export const getAmenities = async (req, res) => {
  try {
    const amenities = await Amenity.find().sort({ createdAt: -1 });
    res.status(200).json(amenities);
  } catch (error) {
    console.log('Error in getAmenities:', error);
    res.status(500).json({ message: error.message });
  }
};

export const updateAmenity = async (req, res) => {
  try {
    const { id } = req.params;
    const { heading } = req.body;

    const amenity = await Amenity.findById(id);
    if (!amenity) {
      return res.status(404).json({ message: 'Amenity not found' });
    }

    if (req.file) {
      const result = await uploadImageToCloudinary(
        req.file.buffer,
        'amenities'
      );
      amenity.icon = result.secure_url;
    }

    if (heading) amenity.heading = heading;

    await amenity.save();

    res.status(200).json({
      message: 'Amenity updated successfully',
      amenity,
    });
  } catch (error) {
    console.log('Error in updateAmenity:', error);
    res.status(500).json({ message: error.message });
  }
};

export const deleteAmenity = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: 'Amenity ID is required' });

    const amenity = await Amenity.findById(id);
    if (!amenity) return res.status(404).json({ message: 'Amenity not found' });

    await Amenity.deleteOne({ _id: id });
    res.status(200).json({ message: 'Amenity deleted successfully' });
  } catch (error) {
    console.log('Error in deleteAmenity:', error);
    res.status(500).json({ message: error.message });
  }
};
