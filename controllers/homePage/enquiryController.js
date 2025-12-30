import Enquiry from '../../models/homePage/enquiryModel.js';
import Project from '../../models/Projects/ProjectAdmin.js';

// CREATE
export const createEnquiry = async (req, res) => {
  try {
    console.log('BODY:', req.body);
    const {
      projectStatus,
      projectId,
      siteVisitDate,
      location,
      name,
      email,
      phone,
      isExistingCustomer,
    } = req.body;

    if (
      !projectStatus ||
      !projectId ||
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

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({
        message: 'Project not found',
      });
    }

    if (project.projectStatus !== projectStatus) {
      return res.status(400).json({
        message: 'Project status does not match selected project',
      });
    }

    const newEnquiry = await Enquiry.create({
      projectStatus,
      projectId,
      projectName: project.projectName,
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

// GET ALL
export const getAllEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find()
      .populate('projectId', 'projectName projectStatus')
      .sort({ createdAt: -1 });

    res.status(200).json(enquiries);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// DELETE
export const deleteEnquiry = async (req, res) => {
  try {
    const { id } = req.params;

    const enquiry = await Enquiry.findById(id);
    if (!enquiry) {
      return res.status(404).json({ message: 'Enquiry not found' });
    }

    await enquiry.deleteOne();

    res.status(200).json({
      message: 'Enquiry deleted successfully',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
