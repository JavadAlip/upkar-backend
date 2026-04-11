import ProjectAdmin from '../../models/Projects/ProjectAdmin.js';
import {
  uploadImageToCloudinary,
  uploadRawToCloudinary,
} from '../../config/cloudinaryUpload.js';

const normalizeSingle = (value) => (Array.isArray(value) ? value[0] : value);
const normalizeNumber = (value) => {
  if (value === undefined || value === null || value === '') return undefined;
  const num = Array.isArray(value) ? Number(value[0]) : Number(value);
  return isNaN(num) ? undefined : num;
};

function parseArrayField(field) {
  if (!field) return [];
  try {
    return typeof field === 'string'
      ? JSON.parse(field)
      : Array.isArray(field)
        ? field
        : [field];
  } catch {
    return Array.isArray(field) ? field : [field];
  }
}

function cleanEmbedUrl(embed) {
  if (!embed) return '';
  if (embed.includes('<iframe')) {
    const match = embed.match(/src="([^"]+)"/);
    return match ? match[1] : '';
  }
  return embed;
}

export const createProject = async (req, res) => {
  try {
    const {
      projectName,
      projectType,
      projectStatus,
      projectDescription,
      location,
      locationEmbedUrl,
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
      masterPlansData,
      sectionsData,
    } = req.body;

    let parsedAboutProject = null;
    if (aboutProject) {
      try {
        parsedAboutProject = JSON.parse(aboutProject);
      } catch {
        parsedAboutProject = { mainDescription: aboutProject }; // fallback for old plain-text
      }
    }

    if (!projectName || !projectType || !projectStatus || !location) {
      return res.status(400).json({
        success: false,
        message: 'Required fields missing',
      });
    }

    let brochureImage = null;
    let brochureFileName = null;
    let brochureMimeType = null;
    let propertyImages = [];

    if (req.files?.propertyImages?.length) {
      for (const file of req.files.propertyImages) {
        const uploaded = await uploadImageToCloudinary(file.buffer, 'projects');
        propertyImages.push(uploaded.secure_url);
      }
    }

    if (req.files?.brochureImage?.length) {
      const file = req.files.brochureImage[0];

      const uploaded = await uploadRawToCloudinary(
        file.buffer,
        'projects/brochures',
      );

      brochureImage = uploaded.secure_url;
      brochureFileName = file.originalname;
      brochureMimeType = file.mimetype;
    }

    let masterPlans = [];
    if (masterPlansData) {
      const plans = JSON.parse(masterPlansData);
      const masterFiles = req.files?.masterPlans || [];

      masterPlans = await Promise.all(
        plans.map(async (plan, index) => {
          let planPhoto = null;

          if (masterFiles[index]) {
            const uploaded = await uploadImageToCloudinary(
              masterFiles[index].buffer,
              'projects',
            );
            planPhoto = uploaded.secure_url;
          }

          return {
            planName: plan.planName,
            carpetArea: plan.carpetArea,
            planPhoto,
          };
        }),
      );
    }

    let sections = [];
    if (sectionsData) {
      const sectionsArr = JSON.parse(sectionsData);
      const sectionFiles = req.files?.sectionImages || [];

      sections = await Promise.all(
        sectionsArr.map(async (sec, index) => {
          let sectionImage = null;

          if (sectionFiles[index]) {
            const uploaded = await uploadImageToCloudinary(
              sectionFiles[index].buffer,
              'projects',
            );
            sectionImage = uploaded.secure_url;
          }

          return {
            sectionName: sec.sectionName,
            sectionDescription: sec.sectionDescription,
            sectionImage,
          };
        }),
      );
    }

    const totalUnitsNum = normalizeNumber(totalUnits);

    const project = await ProjectAdmin.create({
      projectName,
      projectType,
      projectStatus,
      projectDescription,
      location,
      locationEmbedUrl: cleanEmbedUrl(locationEmbedUrl),
      projectAddress,
      priceStartsFrom,
      plotSize,
      possessionDate: possessionDate || null,
      unitConfiguration: normalizeSingle(unitConfiguration),
      waterSupply: normalizeSingle(waterSupply),
      projectArea: normalizeSingle(projectArea),
      ...(totalUnitsNum !== undefined && { totalUnits: totalUnitsNum }),
      keyFeatures: parseArrayField(keyFeatures),
      amenities: parseArrayField(amenities),
      // aboutProject,
      aboutProject: parsedAboutProject,
      reraDescription,
      noBrokerReraId,
      builderProjectReraId,
      locationUrl,
      masterPlans,
      sections,
      brochureImage,
      brochureFileName,
      brochureMimeType,
      propertyImages,
    });

    return res.status(201).json({
      success: true,
      message: 'Project created successfully',
      project,
    });
  } catch (err) {
    console.error('Create Project Error:', err);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const updateProject = async (req, res) => {
  try {
    const project = await ProjectAdmin.findById(req.params.id);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
      });
    }

    const {
      keyFeatures,
      amenities,
      possessionDate,
      waterSupply,
      projectArea,
      totalUnits,
      unitConfiguration,
      locationEmbedUrl,
      masterPlansData,
      sectionsData,
      aboutProject,
      ...rest
    } = req.body;

    Object.assign(project, rest);
    if (aboutProject) {
      try {
        project.aboutProject = JSON.parse(aboutProject);
      } catch {
        project.aboutProject = { mainDescription: aboutProject };
      }
    }

    if (locationEmbedUrl !== undefined) {
      project.locationEmbedUrl = cleanEmbedUrl(locationEmbedUrl);
    }

    if (unitConfiguration)
      project.unitConfiguration = normalizeSingle(unitConfiguration);

    if (waterSupply) project.waterSupply = normalizeSingle(waterSupply);

    if (projectArea) project.projectArea = normalizeSingle(projectArea);

    if (totalUnits !== undefined)
      project.totalUnits = normalizeNumber(totalUnits);

    if (possessionDate) project.possessionDate = possessionDate;

    if (keyFeatures) project.keyFeatures = parseArrayField(keyFeatures);

    if (amenities) project.amenities = parseArrayField(amenities);

    // ==================== PROPERTY IMAGES ====================

    if (req.body.removedPropertyImages) {
      const toRemove = JSON.parse(req.body.removedPropertyImages);
      project.propertyImages = project.propertyImages.filter(
        (url) => !toRemove.includes(url),
      );
    }

    if (req.files?.propertyImages?.length) {
      for (const file of req.files.propertyImages) {
        const uploaded = await uploadImageToCloudinary(file.buffer, 'projects');
        project.propertyImages.push(uploaded.secure_url);
      }
    }

    if (masterPlansData) {
      const plans = JSON.parse(masterPlansData);
      const masterFiles = req.files?.masterPlans || [];

      project.masterPlans = await Promise.all(
        plans.map(async (plan, index) => {
          let planPhoto = plan.planPhoto;

          if (masterFiles[index] && masterFiles[index].size > 0) {
            const uploaded = await uploadImageToCloudinary(
              masterFiles[index].buffer,
              'projects',
            );
            planPhoto = uploaded.secure_url;
          }

          return {
            planName: plan.planName,
            carpetArea: plan.carpetArea,
            planPhoto,
          };
        }),
      );
    }

    if (sectionsData) {
      const sectionsArr = JSON.parse(sectionsData);
      const sectionFiles = req.files?.sectionImages || [];

      project.sections = await Promise.all(
        sectionsArr.map(async (sec, index) => {
          let sectionImage = sec.sectionImage;

          if (sectionFiles[index] && sectionFiles[index].size > 0) {
            const uploaded = await uploadImageToCloudinary(
              sectionFiles[index].buffer,
              'projects',
            );
            sectionImage = uploaded.secure_url;
          }

          return {
            sectionName: sec.sectionName,
            sectionDescription: sec.sectionDescription,
            sectionImage,
          };
        }),
      );
    }

    if (req.files?.brochureImage?.length) {
      const file = req.files.brochureImage[0];

      const uploaded = await uploadRawToCloudinary(
        file.buffer,
        'projects/brochures',
      );

      project.brochureImage = uploaded.secure_url;
      project.brochureFileName = file.originalname;
      project.brochureMimeType = file.mimetype;
    }

    await project.save();

    return res.status(200).json({
      success: true,
      message: 'Project updated successfully',
      project,
    });
  } catch (err) {
    console.error('Update Project Error:', err);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const getAllProjects = async (req, res) => {
  try {
    const projects = await ProjectAdmin.find().sort({ createdAt: -1 });
    return res.status(200).json({ success: true, projects });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const getProjectById = async (req, res) => {
  try {
    const project = await ProjectAdmin.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
      });
    }

    return res.status(200).json({ success: true, project });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const project = await ProjectAdmin.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
      });
    }

    await ProjectAdmin.deleteOne({ _id: project._id });

    return res.status(200).json({
      success: true,
      message: 'Project deleted successfully',
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const updateProjectVisibility = async (req, res) => {
  try {
    const { isVisible } = req.body;
    const project = await ProjectAdmin.findByIdAndUpdate(
      req.params.id,
      { isVisible },
      { new: true },
    );
    res.json({ success: true, project });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
