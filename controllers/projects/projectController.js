// import ProjectAdmin from '../../models/Projects/ProjectAdmin.js';
// import {
//   uploadImageToCloudinary,
//   uploadRawToCloudinary,
// } from '../../config/cloudinaryUpload.js';

// const normalizeSingle = (value) => (Array.isArray(value) ? value[0] : value);
// // const normalizeNumber = (value) =>
// //   Array.isArray(value) ? Number(value[0]) : Number(value);
// const normalizeNumber = (value) => {
//   if (value === undefined || value === null || value === '') return undefined;

//   const num = Array.isArray(value) ? Number(value[0]) : Number(value);

//   return isNaN(num) ? undefined : num;
// };

// // ==================== HELPER ====================
// function parseArrayField(field) {
//   if (!field) return [];
//   try {
//     return typeof field === 'string'
//       ? JSON.parse(field)
//       : Array.isArray(field)
//         ? field
//         : [field];
//   } catch {
//     return Array.isArray(field) ? field : [field];
//   }
// }

// // ==================== CREATE PROJECT ====================
// export const createProject = async (req, res) => {
//   try {
//     const {
//       projectName,
//       projectType,
//       projectStatus,
//       projectDescription,
//       location,
//       locationEmbedUrl,
//       projectAddress,
//       priceStartsFrom,
//       plotSize,
//       possessionDate,
//       unitConfiguration,
//       waterSupply,
//       projectArea,
//       totalUnits,
//       keyFeatures,
//       amenities,
//       aboutProject,
//       reraDescription,
//       noBrokerReraId,
//       builderProjectReraId,
//       locationUrl,
//       masterPlansData,
//       sectionsData,
//     } = req.body;

//     if (!projectName || !projectType || !projectStatus || !location) {
//       return res
//         .status(400)
//         .json({ success: false, message: 'Required fields missing' });
//     }

//     // ==================== UPLOAD IMAGES ====================
//     let brochureImage = null;
//     let brochureFileName = null;
//     let brochureMimeType = null;
//     let propertyImages = [];
//     const masterPlansFiles = req.files?.masterPlans || [];
//     const sectionFiles = req.files?.sectionImages || [];

//     // Upload property images
//     if (req.files?.propertyImages?.length) {
//       for (const file of req.files.propertyImages) {
//         const uploaded = await uploadImageToCloudinary(file.buffer, 'projects');
//         propertyImages.push(uploaded.secure_url);
//       }
//     }

//     // Upload brochure image
//     // if (req.files?.brochureImage?.length) {
//     //   // const uploaded = await uploadImageToCloudinary(
//     //   //   req.files.brochureImage[0].buffer,
//     //   //   'projects',
//     //   // );
//     //   // brochureImage = uploaded.secure_url;
//     //   const uploaded = await uploadRawToCloudinary(
//     //     req.files.brochureImage[0].buffer,
//     //     'projects/brochures',
//     //   );
//     //   brochureImage = uploaded.secure_url;
//     // }
//     if (req.files?.brochureImage?.length) {
//       const file = req.files.brochureImage[0];

//       const uploaded = await uploadRawToCloudinary(
//         file.buffer,
//         'projects/brochures',
//       );

//       brochureImage = uploaded.secure_url;

//       //  SAVE REAL FILE INFO
//       brochureFileName = file.originalname;
//       brochureMimeType = file.mimetype;
//     }

//     // ==================== PARSE KEY FEATURES & AMENITIES ====================
//     const parsedKeyFeatures = parseArrayField(keyFeatures);
//     const parsedAmenities = parseArrayField(amenities);

//     // ==================== MASTER PLANS ====================
//     let masterPlans = [];
//     if (masterPlansData) {
//       const plans = JSON.parse(masterPlansData);
//       masterPlans = await Promise.all(
//         plans.map(async (plan, index) => ({
//           planName: plan.planName,
//           carpetArea: plan.carpetArea,
//           planPhoto: masterPlansFiles[index]
//             ? (
//                 await uploadImageToCloudinary(
//                   masterPlansFiles[index].buffer,
//                   'projects',
//                 )
//               ).secure_url
//             : null,
//         })),
//       );
//     }

//     // ==================== SECTIONS ====================
//     let sections = [];
//     if (sectionsData) {
//       const sectionsArr = JSON.parse(sectionsData);
//       sections = await Promise.all(
//         sectionsArr.map(async (sec, index) => ({
//           sectionName: sec.sectionName,
//           sectionDescription: sec.sectionDescription,
//           sectionImage: sectionFiles[index]
//             ? (
//                 await uploadImageToCloudinary(
//                   sectionFiles[index].buffer,
//                   'projects',
//                 )
//               ).secure_url
//             : null,
//         })),
//       );
//     }

//     // ==================== CREATE PROJECT ====================
//     // const project = await ProjectAdmin.create({
//     //   projectName,
//     //   projectType,
//     //   projectStatus,
//     //   projectDescription,
//     //   location,
//     //   projectAddress,
//     //   priceStartsFrom,
//     //   plotSize,
//     //   possessionDate: possessionDate || null,
//     //   unitConfiguration: normalizeSingle(unitConfiguration),
//     //   waterSupply: normalizeSingle(waterSupply),
//     //   projectArea: normalizeSingle(projectArea),
//     //   totalUnits: normalizeNumber(totalUnits),
//     //   keyFeatures: parsedKeyFeatures,
//     //   amenities: parsedAmenities,
//     //   aboutProject,
//     //   reraDescription,
//     //   noBrokerReraId,
//     //   builderProjectReraId,
//     //   locationUrl,
//     //   masterPlans,
//     //   sections,
//     //   brochureImage,
//     //   propertyImages,
//     //   brochureFileName,
//     //   brochureMimeType,
//     // });
//     const totalUnitsNum = normalizeNumber(totalUnits);

//     const project = await ProjectAdmin.create({
//       projectName,
//       projectType,
//       projectStatus,
//       projectDescription,
//       location,
//       locationEmbedUrl,
//       projectAddress,
//       priceStartsFrom,
//       plotSize,
//       possessionDate: possessionDate || null,
//       unitConfiguration: normalizeSingle(unitConfiguration),
//       waterSupply: normalizeSingle(waterSupply),
//       projectArea: normalizeSingle(projectArea),

//       ...(totalUnitsNum !== undefined && { totalUnits: totalUnitsNum }),

//       keyFeatures: parsedKeyFeatures,
//       amenities: parsedAmenities,
//       aboutProject,
//       reraDescription,
//       noBrokerReraId,
//       builderProjectReraId,
//       locationUrl,
//       masterPlans,
//       sections,
//       brochureImage,
//       propertyImages,
//       brochureFileName,
//       brochureMimeType,
//     });

//     return res.status(201).json({
//       success: true,
//       message: 'Project created successfully',
//       project,
//     });
//   } catch (err) {
//     console.error('Create Project Error:', err);
//     return res.status(500).json({ success: false, message: err.message });
//   }
// };

// // ==================== UPDATE PROJECT ====================
// export const updateProject = async (req, res) => {
//   try {
//     const project = await ProjectAdmin.findById(req.params.id);
//     if (!project)
//       return res
//         .status(404)
//         .json({ success: false, message: 'Project not found' });

//     const {
//       keyFeatures,
//       amenities,
//       possessionDate,
//       waterSupply,
//       projectArea,
//       totalUnits,
//       unitConfiguration,
//       masterPlansData,
//       sectionsData,
//       ...rest
//     } = req.body;

//     // Update basic fields
//     Object.assign(project, rest);

//     if (unitConfiguration)
//       project.unitConfiguration = normalizeSingle(unitConfiguration);
//     if (waterSupply) project.waterSupply = normalizeSingle(waterSupply);
//     if (projectArea) project.projectArea = normalizeSingle(projectArea);
//     // if (totalUnits) project.totalUnits = normalizeNumber(totalUnits);
//     if (totalUnits !== undefined)
//       project.totalUnits = normalizeNumber(totalUnits);

//     if (possessionDate) project.possessionDate = possessionDate;

//     project.keyFeatures = keyFeatures
//       ? parseArrayField(keyFeatures)
//       : project.keyFeatures;
//     project.amenities = amenities
//       ? parseArrayField(amenities)
//       : project.amenities;

//     // ==================== PROPERTY IMAGES ====================
//     if (req.files?.propertyImages?.length) {
//       for (const file of req.files.propertyImages) {
//         const uploaded = await uploadImageToCloudinary(file.buffer, 'projects');
//         project.propertyImages.push(uploaded.secure_url);
//       }
//     }

//     // ==================== MASTER PLANS ====================
//     if (masterPlansData) {
//       const plans = JSON.parse(masterPlansData);
//       const masterPlansFiles = req.files?.masterPlans || [];

//       // Filter out placeholder files
//       const validFiles = masterPlansFiles.filter((file) => file.size > 0);
//       let fileIndex = 0;

//       project.masterPlans = await Promise.all(
//         plans.map(async (plan, index) => {
//           // Check if a new file was uploaded for this plan
//           const hasNewFile =
//             masterPlansFiles[index] && masterPlansFiles[index].size > 0;

//           let planPhoto = plan.planPhoto;

//           if (hasNewFile) {
//             // Upload the new image
//             const uploaded = await uploadImageToCloudinary(
//               masterPlansFiles[index].buffer,
//               'projects',
//             );
//             planPhoto = uploaded.secure_url;
//           }

//           return {
//             planName: plan.planName,
//             carpetArea: plan.carpetArea,
//             planPhoto: planPhoto,
//           };
//         }),
//       );
//     }

//     // ==================== SECTIONS ====================
//     if (sectionsData) {
//       const sectionsArr = JSON.parse(sectionsData);
//       const sectionFiles = req.files?.sectionImages || [];

//       project.sections = await Promise.all(
//         sectionsArr.map(async (sec, index) => {
//           // Check if a new file was uploaded for this section
//           const hasNewFile =
//             sectionFiles[index] && sectionFiles[index].size > 0;

//           let sectionImage = sec.sectionImage;

//           if (hasNewFile) {
//             // Upload the new image
//             const uploaded = await uploadImageToCloudinary(
//               sectionFiles[index].buffer,
//               'projects',
//             );
//             sectionImage = uploaded.secure_url;
//           }

//           return {
//             sectionName: sec.sectionName,
//             sectionDescription: sec.sectionDescription,
//             sectionImage: sectionImage,
//           };
//         }),
//       );
//     }

//     // ==================== BROCHURE IMAGE ====================
//     // if (req.files?.brochureImage?.length) {
//     //   // const uploaded = await uploadImageToCloudinary(
//     //   //   req.files.brochureImage[0].buffer,
//     //   //   'projects',
//     //   // );
//     //   // project.brochureImage = uploaded.secure_url;
//     //   const uploaded = await uploadRawToCloudinary(
//     //     req.files.brochureImage[0].buffer,
//     //     'projects/brochures',
//     //   );
//     //   project.brochureImage = uploaded.secure_url;
//     // }
//     if (req.files?.brochureImage?.length) {
//       const file = req.files.brochureImage[0];

//       const uploaded = await uploadRawToCloudinary(
//         file.buffer,
//         'projects/brochures',
//       );

//       project.brochureImage = uploaded.secure_url;
//       project.brochureFileName = file.originalname;
//       project.brochureMimeType = file.mimetype;
//     }

//     await project.save();

//     return res.status(200).json({
//       success: true,
//       message: 'Project updated successfully',
//       project,
//     });
//   } catch (err) {
//     console.error('Update Project Error:', err);
//     return res.status(500).json({ success: false, message: err.message });
//   }
// };

// // ==================== GET PROJECTS ====================
// export const getAllProjects = async (req, res) => {
//   try {
//     const projects = await ProjectAdmin.find().sort({ createdAt: -1 });
//     return res.status(200).json({ success: true, projects });
//   } catch (err) {
//     return res.status(500).json({ success: false, message: err.message });
//   }
// };

// export const getProjectById = async (req, res) => {
//   try {
//     const project = await ProjectAdmin.findById(req.params.id);
//     if (!project)
//       return res
//         .status(404)
//         .json({ success: false, message: 'Project not found' });

//     return res.status(200).json({ success: true, project });
//   } catch (err) {
//     return res.status(500).json({ success: false, message: err.message });
//   }
// };

// // ==================== DELETE PROJECT ====================
// export const deleteProject = async (req, res) => {
//   try {
//     const project = await ProjectAdmin.findById(req.params.id);
//     if (!project)
//       return res
//         .status(404)
//         .json({ success: false, message: 'Project not found' });

//     await ProjectAdmin.deleteOne({ _id: project._id });

//     return res
//       .status(200)
//       .json({ success: true, message: 'Project deleted successfully' });
//   } catch (err) {
//     return res.status(500).json({ success: false, message: err.message });
//   }
// };

import ProjectAdmin from '../../models/Projects/ProjectAdmin.js';
import {
  uploadImageToCloudinary,
  uploadRawToCloudinary,
} from '../../config/cloudinaryUpload.js';

// ==================== HELPERS ====================

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

// ✅ Extract only src from iframe if admin pastes full iframe
function cleanEmbedUrl(embed) {
  if (!embed) return '';
  if (embed.includes('<iframe')) {
    const match = embed.match(/src="([^"]+)"/);
    return match ? match[1] : '';
  }
  return embed;
}

// ==================== CREATE PROJECT ====================

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

    if (!projectName || !projectType || !projectStatus || !location) {
      return res.status(400).json({
        success: false,
        message: 'Required fields missing',
      });
    }

    // ==================== IMAGE UPLOADS ====================

    let brochureImage = null;
    let brochureFileName = null;
    let brochureMimeType = null;
    let propertyImages = [];

    // Property Images
    if (req.files?.propertyImages?.length) {
      for (const file of req.files.propertyImages) {
        const uploaded = await uploadImageToCloudinary(file.buffer, 'projects');
        propertyImages.push(uploaded.secure_url);
      }
    }

    // Brochure Upload
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

    // ==================== MASTER PLANS ====================

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

    // ==================== SECTIONS ====================

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

    // ==================== CREATE ====================

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
      aboutProject,
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

// ==================== UPDATE PROJECT ====================

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
      ...rest
    } = req.body;

    Object.assign(project, rest);

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

    if (req.files?.propertyImages?.length) {
      for (const file of req.files.propertyImages) {
        const uploaded = await uploadImageToCloudinary(file.buffer, 'projects');
        project.propertyImages.push(uploaded.secure_url);
      }
    }

    // ==================== MASTER PLANS UPDATE ====================

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

    // ==================== SECTIONS UPDATE ====================

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

    // ==================== BROCHURE UPDATE ====================

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

// ==================== GET ALL ====================

export const getAllProjects = async (req, res) => {
  try {
    const projects = await ProjectAdmin.find().sort({ createdAt: -1 });
    return res.status(200).json({ success: true, projects });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// ==================== GET BY ID ====================

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

// ==================== DELETE ====================

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
