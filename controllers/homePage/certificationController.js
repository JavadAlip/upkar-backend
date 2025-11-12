import Certification from '../../models/homePage/certificationModel.js';
import { uploadImageToCloudinary } from '../../config/cloudinaryUpload.js';

// Create Certification
export const createCertification = async (req, res) => {
  try {
    const { heading } = req.body;

    if (!heading || !req.file) {
      return res.status(400).json({ message: 'Heading and icon are required' });
    }

    const result = await uploadImageToCloudinary(req.file.buffer, 'certifications');

    const certification = await Certification.create({
      heading,
      icon: result.secure_url,
    });

    res.status(201).json({ message: 'Certification created successfully', certification });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// Get All Certifications
export const getCertifications = async (req, res) => {
  try {
    const certifications = await Certification.find().sort({ createdAt: -1 });
    res.status(200).json(certifications);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// Delete Certification
export const deleteCertification = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: 'Certification ID is required' });

    const certification = await Certification.findById(id);
    if (!certification) return res.status(404).json({ message: 'Certification not found' });

    await Certification.deleteOne({ _id: id });
    res.status(200).json({ message: 'Certification deleted successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
