// import CareerEnquiry from '../../models/careersPage/careerEnquiryModel.js';

// //   CREATE
// export const createCareerEnquiry = async (req, res) => {
//   try {
//     const { serviceInterestedIn, name, email, phone, location } = req.body;

//     if (!serviceInterestedIn || !name || !email || !phone || !location) {
//       return res.status(400).json({
//         message: 'All fields are required',
//       });
//     }

//     const newEnquiry = await CareerEnquiry.create({
//       serviceInterestedIn,
//       name,
//       email,
//       phone,
//       location,
//     });

//     res.status(201).json({
//       message: 'Career enquiry submitted successfully',
//       enquiry: newEnquiry,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: error.message });
//   }
// };

// //   GET ALL
// export const getAllCareerEnquiries = async (req, res) => {
//   try {
//     const enquiries = await CareerEnquiry.find().sort({
//       createdAt: -1,
//     });

//     res.status(200).json(enquiries);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: error.message });
//   }
// };

// //  DELETE
// export const deleteCareerEnquiry = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const enquiry = await CareerEnquiry.findById(id);

//     if (!enquiry) {
//       return res.status(404).json({
//         message: 'Career enquiry not found',
//       });
//     }

//     await CareerEnquiry.findByIdAndDelete(id);

//     res.status(200).json({
//       message: 'Career enquiry deleted successfully',
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: error.message });
//   }
// };

import CareerEnquiry from '../../models/careersPage/careerEnquiryModel.js';
import { uploadRawToCloudinary } from '../../config/cloudinaryUpload.js';
import axios from 'axios';

export const createCareerEnquiry = async (req, res) => {
  try {
    const { serviceInterestedIn, name, email, phone, location } = req.body;

    if (!serviceInterestedIn || !name || !email || !phone || !location) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    let resumeUrl = null;
    let resumeFileName = null;
    let resumeMimeType = null;

    //  HANDLE RESUME UPLOAD
    if (req.file) {
      const uploaded = await uploadRawToCloudinary(
        req.file.buffer,
        'career/resumes',
      );

      resumeUrl = uploaded.secure_url;
      resumeFileName = req.file.originalname;
      resumeMimeType = req.file.mimetype;
    }

    const newEnquiry = await CareerEnquiry.create({
      serviceInterestedIn,
      name,
      email,
      phone,
      location,
      resumeUrl,
      resumeFileName,
      resumeMimeType,
    });

    res.status(201).json({
      message: 'Career enquiry submitted successfully',
      enquiry: newEnquiry,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

//   GET ALL
export const getAllCareerEnquiries = async (req, res) => {
  try {
    const enquiries = await CareerEnquiry.find().sort({
      createdAt: -1,
    });

    res.status(200).json(enquiries);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

//  DELETE
export const deleteCareerEnquiry = async (req, res) => {
  try {
    const { id } = req.params;

    const enquiry = await CareerEnquiry.findById(id);

    if (!enquiry) {
      return res.status(404).json({
        message: 'Career enquiry not found',
      });
    }

    await CareerEnquiry.findByIdAndDelete(id);

    res.status(200).json({
      message: 'Career enquiry deleted successfully',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const downloadCareerResume = async (req, res) => {
  try {
    const { id } = req.params;

    const enquiry = await CareerEnquiry.findById(id);
    if (!enquiry || !enquiry.resumeUrl) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    //  Fetch resume from Cloudinary
    const fileResponse = await axios.get(enquiry.resumeUrl, {
      responseType: 'arraybuffer',
    });

    const fileName = enquiry.resumeFileName?.endsWith('.pdf')
      ? enquiry.resumeFileName
      : `${enquiry.resumeFileName || 'resume'}.pdf`;

    //  FORCE DOWNLOAD AS PDF
    res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
    res.setHeader('Content-Type', enquiry.resumeMimeType || 'application/pdf');

    return res.send(fileResponse.data);
  } catch (error) {
    console.error('Resume download error:', error);
    res.status(500).json({ message: 'Failed to download resume' });
  }
};
