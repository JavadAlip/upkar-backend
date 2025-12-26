import ProjectAdmin from '../../models/Projects/ProjectAdmin.js';
import { uploadImageToCloudinary } from '../../config/cloudinaryUpload.js';

const normalizeSingle = (value) => (Array.isArray(value) ? value[0] : value);
const normalizeNumber = (value) =>
  Array.isArray(value) ? Number(value[0]) : Number(value);

export const createProject = async (req, res) => {
  try {
    const {
      projectName,
      projectType,
      projectStatus,
      projectDescription,
      location,
      projectAddress,
      priceStartsFrom,
      plotSize,
      possessionDate,
      unitConfiguration,
      waterSupply,
      projectArea,
      totalUnits,
      keyFeatures,
      amenities,
      aboutProject,
      reraDescription,
      noBrokerReraId,
      builderProjectReraId,
      locationUrl,
    } = req.body;

    if (!projectName || !projectType || !projectStatus || !location) {
      return res
        .status(400)
        .json({ success: false, message: 'Required fields missing' });
    }

    let masterPlans = [];
    let brochureImage = null;
    let propertyImages = [];

    if (req.files?.masterPlans?.length) {
      for (const file of req.files.masterPlans) {
        const uploaded = await uploadImageToCloudinary(file.buffer, 'projects');
        masterPlans.push(uploaded.secure_url);
      }
    }

    if (req.files?.brochureImage?.length) {
      const uploaded = await uploadImageToCloudinary(
        req.files.brochureImage[0].buffer,
        'projects'
      );
      brochureImage = uploaded.secure_url;
    }

    if (req.files?.propertyImages?.length) {
      for (const file of req.files.propertyImages) {
        const uploaded = await uploadImageToCloudinary(file.buffer, 'projects');
        propertyImages.push(uploaded.secure_url);
      }
    }

    let parsedKeyFeatures = [];
    let parsedAmenities = [];

    if (keyFeatures) {
      try {
        parsedKeyFeatures =
          typeof keyFeatures === 'string'
            ? JSON.parse(keyFeatures)
            : Array.isArray(keyFeatures)
            ? keyFeatures
            : [keyFeatures];
      } catch (e) {
        parsedKeyFeatures = Array.isArray(keyFeatures)
          ? keyFeatures
          : [keyFeatures];
      }
    }

    if (amenities) {
      try {
        parsedAmenities =
          typeof amenities === 'string'
            ? JSON.parse(amenities)
            : Array.isArray(amenities)
            ? amenities
            : [amenities];
      } catch (e) {
        parsedAmenities = Array.isArray(amenities) ? amenities : [amenities];
      }
    }

    //  CREATE PROJECT
    const project = await ProjectAdmin.create({
      projectName,
      projectType,
      projectStatus,
      projectDescription,
      location,
      projectAddress,
      priceStartsFrom,
      plotSize,
      possessionDate: possessionDate || null,

      unitConfiguration: normalizeSingle(unitConfiguration),
      waterSupply: normalizeSingle(waterSupply),
      projectArea: normalizeSingle(projectArea),
      totalUnits: normalizeNumber(totalUnits),

      keyFeatures: parsedKeyFeatures,
      amenities: parsedAmenities,

      aboutProject,
      reraDescription,
      noBrokerReraId,
      builderProjectReraId,
      locationUrl,

      masterPlans,
      brochureImage,
      propertyImages,
    });

    return res.status(201).json({
      success: true,
      message: 'Project created successfully',
      project,
    });
  } catch (err) {
    console.error('Create Project Error:', err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

//  GET ALL PROJECTS

export const getAllProjects = async (req, res) => {
  try {
    const projects = await ProjectAdmin.find().sort({ createdAt: -1 });
    return res.status(200).json({ success: true, projects });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

//  GET SINGLE PROJECT

export const getProjectById = async (req, res) => {
  try {
    const project = await ProjectAdmin.findById(req.params.id);
    if (!project)
      return res
        .status(404)
        .json({ success: false, message: 'Project not found' });
    return res.status(200).json({ success: true, project });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

//  UPDATE PROJECT

export const updateProject = async (req, res) => {
  try {
    const project = await ProjectAdmin.findById(req.params.id);
    if (!project)
      return res
        .status(404)
        .json({ success: false, message: 'Project not found' });

    const {
      keyFeatures,
      amenities,
      possessionDate,
      waterSupply,
      projectArea,
      totalUnits,
      unitConfiguration,
      ...rest
    } = req.body;

    Object.assign(project, rest);

    if (unitConfiguration)
      project.unitConfiguration = normalizeSingle(unitConfiguration);
    if (waterSupply) project.waterSupply = normalizeSingle(waterSupply);
    if (projectArea) project.projectArea = normalizeSingle(projectArea);
    if (totalUnits) project.totalUnits = normalizeNumber(totalUnits);
    if (possessionDate) project.possessionDate = possessionDate;

    if (keyFeatures) {
      try {
        project.keyFeatures =
          typeof keyFeatures === 'string'
            ? JSON.parse(keyFeatures)
            : Array.isArray(keyFeatures)
            ? keyFeatures
            : [keyFeatures];
      } catch (e) {
        project.keyFeatures = Array.isArray(keyFeatures)
          ? keyFeatures
          : [keyFeatures];
      }
    }

    if (amenities) {
      try {
        project.amenities =
          typeof amenities === 'string'
            ? JSON.parse(amenities)
            : Array.isArray(amenities)
            ? amenities
            : [amenities];
      } catch (e) {
        project.amenities = Array.isArray(amenities) ? amenities : [amenities];
      }
    }

    if (req.files?.propertyImages?.length) {
      const newImages = [];
      for (const file of req.files.propertyImages) {
        const uploaded = await uploadImageToCloudinary(file.buffer, 'projects');
        newImages.push(uploaded.secure_url);
      }

      project.propertyImages = [
        ...(project.propertyImages || []),
        ...newImages,
      ];
    }

    if (req.files?.masterPlans?.length) {
      const newPlans = [];
      for (const file of req.files.masterPlans) {
        const uploaded = await uploadImageToCloudinary(file.buffer, 'projects');
        newPlans.push(uploaded.secure_url);
      }

      project.masterPlans = [...(project.masterPlans || []), ...newPlans];
    }

    if (req.files?.brochureImage?.length) {
      const uploaded = await uploadImageToCloudinary(
        req.files.brochureImage[0].buffer,
        'projects'
      );
      project.brochureImage = uploaded.secure_url;
    }

    await project.save();
    return res.status(200).json({
      success: true,
      message: 'Project updated successfully',
      project,
    });
  } catch (err) {
    console.error('Update Project Error:', err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

//  DELETE PROJECT

export const deleteProject = async (req, res) => {
  try {
    const project = await ProjectAdmin.findById(req.params.id);
    if (!project)
      return res
        .status(404)
        .json({ success: false, message: 'Project not found' });

    await ProjectAdmin.deleteOne({ _id: project._id });
    return res
      .status(200)
      .json({ success: true, message: 'Project deleted successfully' });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
