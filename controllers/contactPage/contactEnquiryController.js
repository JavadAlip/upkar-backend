import ContactEnquiry from '../../models/contactPage/contactEnquiryModel.js';
import Project from '../../models/Projects/ProjectAdmin.js';

/**
 * CREATE CONTACT ENQUIRY
 */
export const createContactEnquiry = async (req, res) => {
  try {
    const { projectStatus, projectId, location, name, email, phone, query } =
      req.body;

    if (
      !projectStatus ||
      !projectId ||
      !location ||
      !name ||
      !email ||
      !phone ||
      !query
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

    const newContactEnquiry = await ContactEnquiry.create({
      projectStatus,
      projectId,
      projectName: project.projectName,
      location,
      name,
      email,
      phone,
      query,
    });

    res.status(201).json({
      message: 'Contact enquiry submitted successfully',
      enquiry: newContactEnquiry,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * GET ALL CONTACT ENQUIRIES
 */
export const getAllContactEnquiries = async (req, res) => {
  try {
    const enquiries = await ContactEnquiry.find()
      .populate('projectId', 'projectName projectStatus')
      .sort({ createdAt: -1 });

    res.status(200).json(enquiries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * DELETE CONTACT ENQUIRY
 */
export const deleteContactEnquiry = async (req, res) => {
  try {
    const { id } = req.params;

    const enquiry = await ContactEnquiry.findById(id);
    if (!enquiry) {
      return res.status(404).json({ message: 'Contact enquiry not found' });
    }

    await enquiry.deleteOne();

    res.status(200).json({
      message: 'Contact enquiry deleted successfully',
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
