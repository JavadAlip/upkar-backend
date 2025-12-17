import Enquiry from '../../models/homePage/enquiryModel.js';

export const createEnquiry = async (req, res) => {
  try {
    const {
      projectType,
      siteVisitDate,
      location,
      name,
      email,
      phone,
      isExistingCustomer,
    } = req.body;

    // Validation
    if (
      !projectType ||
      !siteVisitDate ||
      !location ||
      !name ||
      !email ||
      !phone ||
      !isExistingCustomer
    ) {
      return res.status(400).json({
        message: 'All fields are required',
      });
    }

    const newEnquiry = await Enquiry.create({
      projectType,
      siteVisitDate,
      location,
      name,
      email,
      phone,
      isExistingCustomer,
    });

    res.status(201).json({
      message: 'Enquiry submitted successfully',
      enquiry: newEnquiry,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const getAllEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });
    res.status(200).json(enquiries);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
