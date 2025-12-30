import CareerEnquiry from '../../models/careersPage/careerEnquiryModel.js';

//   CREATE
export const createCareerEnquiry = async (req, res) => {
  try {
    const { serviceInterestedIn, name, email, phone, location } = req.body;

    if (!serviceInterestedIn || !name || !email || !phone || !location) {
      return res.status(400).json({
        message: 'All fields are required',
      });
    }

    const newEnquiry = await CareerEnquiry.create({
      serviceInterestedIn,
      name,
      email,
      phone,
      location,
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
