import EventEnquiry from '../../models/eventsPage/eventEnquiryModel.js';

// CREATE EVENT ENQUIRY
export const createEventEnquiry = async (req, res) => {
  try {
    const { name, email, mobile, location } = req.body;

    if (!name || !email || !mobile || !location) {
      return res.status(400).json({
        message: 'All fields are required',
      });
    }

    const newEnquiry = await EventEnquiry.create({
      name,
      email,
      mobile,
      location,
    });

    res.status(201).json({
      message: 'Event enquiry submitted successfully',
      enquiry: newEnquiry,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// GET ALL EVENT ENQUIRIES
export const getAllEventEnquiries = async (req, res) => {
  try {
    const enquiries = await EventEnquiry.find().sort({ createdAt: -1 });

    res.status(200).json(enquiries);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// DELETE EVENT ENQUIRY
export const deleteEventEnquiry = async (req, res) => {
  try {
    const { id } = req.params;

    const enquiry = await EventEnquiry.findById(id);
    if (!enquiry) {
      return res.status(404).json({
        message: 'Event enquiry not found',
      });
    }

    await enquiry.deleteOne();

    res.status(200).json({
      message: 'Event enquiry deleted successfully',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
