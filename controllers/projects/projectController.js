// import ProjectAdmin from '../../models/Projects/ProjectAdmin.js';
// import { uploadImageToCloudinary } from '../../config/cloudinaryUpload.js';

// const normalizeSingle = (value) => (Array.isArray(value) ? value[0] : value);
// const normalizeNumber = (value) =>
//   Array.isArray(value) ? Number(value[0]) : Number(value);

// export const createProject = async (req, res) => {
//   try {
//     const {
//       projectName,
//       projectType,
//       projectStatus,
//       projectDescription,
//       location,
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
//     } = req.body;

//     if (!projectName || !projectType || !projectStatus || !location) {
//       return res
//         .status(400)
//         .json({ success: false, message: 'Required fields missing' });
//     }

//     let masterPlans = [];
//     let brochureImage = null;
//     let propertyImages = [];

//     if (req.files?.masterPlans?.length) {
//       for (const file of req.files.masterPlans) {
//         const uploaded = await uploadImageToCloudinary(file.buffer, 'projects');
//         masterPlans.push(uploaded.secure_url);
//       }
//     }

//     if (req.files?.brochureImage?.length) {
//       const uploaded = await uploadImageToCloudinary(
//         req.files.brochureImage[0].buffer,
//         'projects'
//       );
//       brochureImage = uploaded.secure_url;
//     }

//     if (req.files?.propertyImages?.length) {
//       for (const file of req.files.propertyImages) {
//         const uploaded = await uploadImageToCloudinary(file.buffer, 'projects');
//         propertyImages.push(uploaded.secure_url);
//       }
//     }

//     let parsedKeyFeatures = [];
//     let parsedAmenities = [];

//     if (keyFeatures) {
//       try {
//         parsedKeyFeatures =
//           typeof keyFeatures === 'string'
//             ? JSON.parse(keyFeatures)
//             : Array.isArray(keyFeatures)
//             ? keyFeatures
//             : [keyFeatures];
//       } catch (e) {
//         parsedKeyFeatures = Array.isArray(keyFeatures)
//           ? keyFeatures
//           : [keyFeatures];
//       }
//     }

//     if (amenities) {
//       try {
//         parsedAmenities =
//           typeof amenities === 'string'
//             ? JSON.parse(amenities)
//             : Array.isArray(amenities)
//             ? amenities
//             : [amenities];
//       } catch (e) {
//         parsedAmenities = Array.isArray(amenities) ? amenities : [amenities];
//       }
//     }

//     //  CREATE PROJECT
//     const project = await ProjectAdmin.create({
//       projectName,
//       projectType,
//       projectStatus,
//       projectDescription,
//       location,
//       projectAddress,
//       priceStartsFrom,
//       plotSize,
//       possessionDate: possessionDate || null,

//       unitConfiguration: normalizeSingle(unitConfiguration),
//       waterSupply: normalizeSingle(waterSupply),
//       projectArea: normalizeSingle(projectArea),
//       totalUnits: normalizeNumber(totalUnits),

//       keyFeatures: parsedKeyFeatures,
//       amenities: parsedAmenities,

//       aboutProject,
//       reraDescription,
//       noBrokerReraId,
//       builderProjectReraId,
//       locationUrl,

//       masterPlans,
//       brochureImage,
//       propertyImages,
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

// //  GET ALL PROJECTS

// export const getAllProjects = async (req, res) => {
//   try {
//     const projects = await ProjectAdmin.find().sort({ createdAt: -1 });
//     return res.status(200).json({ success: true, projects });
//   } catch (err) {
//     return res.status(500).json({ success: false, message: err.message });
//   }
// };

// //  GET SINGLE PROJECT

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

// //  UPDATE PROJECT

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
//       ...rest
//     } = req.body;

//     Object.assign(project, rest);

//     if (unitConfiguration)
//       project.unitConfiguration = normalizeSingle(unitConfiguration);
//     if (waterSupply) project.waterSupply = normalizeSingle(waterSupply);
//     if (projectArea) project.projectArea = normalizeSingle(projectArea);
//     if (totalUnits) project.totalUnits = normalizeNumber(totalUnits);
//     if (possessionDate) project.possessionDate = possessionDate;

//     if (keyFeatures) {
//       try {
//         project.keyFeatures =
//           typeof keyFeatures === 'string'
//             ? JSON.parse(keyFeatures)
//             : Array.isArray(keyFeatures)
//             ? keyFeatures
//             : [keyFeatures];
//       } catch (e) {
//         project.keyFeatures = Array.isArray(keyFeatures)
//           ? keyFeatures
//           : [keyFeatures];
//       }
//     }

//     if (amenities) {
//       try {
//         project.amenities =
//           typeof amenities === 'string'
//             ? JSON.parse(amenities)
//             : Array.isArray(amenities)
//             ? amenities
//             : [amenities];
//       } catch (e) {
//         project.amenities = Array.isArray(amenities) ? amenities : [amenities];
//       }
//     }

//     if (req.files?.propertyImages?.length) {
//       const newImages = [];
//       for (const file of req.files.propertyImages) {
//         const uploaded = await uploadImageToCloudinary(file.buffer, 'projects');
//         newImages.push(uploaded.secure_url);
//       }

//       project.propertyImages = [
//         ...(project.propertyImages || []),
//         ...newImages,
//       ];
//     }

//     if (req.files?.masterPlans?.length) {
//       const newPlans = [];
//       for (const file of req.files.masterPlans) {
//         const uploaded = await uploadImageToCloudinary(file.buffer, 'projects');
//         newPlans.push(uploaded.secure_url);
//       }

//       project.masterPlans = [...(project.masterPlans || []), ...newPlans];
//     }

//     if (req.files?.brochureImage?.length) {
//       const uploaded = await uploadImageToCloudinary(
//         req.files.brochureImage[0].buffer,
//         'projects'
//       );
//       project.brochureImage = uploaded.secure_url;
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

// //  DELETE PROJECT

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

// import ProjectAdmin from '../../models/Projects/ProjectAdmin.js';
// import { uploadImageToCloudinary } from '../../config/cloudinaryUpload.js';

// const normalizeSingle = (value) => (Array.isArray(value) ? value[0] : value);
// const normalizeNumber = (value) =>
//   Array.isArray(value) ? Number(value[0]) : Number(value);

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
//       masterPlansData, // JSON string [{planName, carpetArea}]
//       sectionsData, // JSON string [{sectionName, sectionDescription}]
//     } = req.body;

//     if (!projectName || !projectType || !projectStatus || !location) {
//       return res
//         .status(400)
//         .json({ success: false, message: 'Required fields missing' });
//     }

//     // ==================== UPLOAD IMAGES ====================
//     let brochureImage = null;
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
//     if (req.files?.brochureImage?.length) {
//       const uploaded = await uploadImageToCloudinary(
//         req.files.brochureImage[0].buffer,
//         'projects',
//       );
//       brochureImage = uploaded.secure_url;
//     }

//     // ==================== PARSE KEY FEATURES & AMENITIES ====================
//     const parsedKeyFeatures = parseArrayField(keyFeatures);
//     const parsedAmenities = parseArrayField(amenities);

//     // ==================== MASTER PLANS ====================
//     let masterPlans = [];
//     if (masterPlansData) {
//       const plans = JSON.parse(masterPlansData); // [{planName, carpetArea}]
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
//       const sectionsArr = JSON.parse(sectionsData); // [{sectionName, sectionDescription}]
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
//     const project = await ProjectAdmin.create({
//       projectName,
//       projectType,
//       projectStatus,
//       projectDescription,
//       location,
//       projectAddress,
//       priceStartsFrom,
//       plotSize,
//       possessionDate: possessionDate || null,
//       unitConfiguration: normalizeSingle(unitConfiguration),
//       waterSupply: normalizeSingle(waterSupply),
//       projectArea: normalizeSingle(projectArea),
//       totalUnits: normalizeNumber(totalUnits),
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

//     Object.assign(project, rest);

//     if (unitConfiguration)
//       project.unitConfiguration = normalizeSingle(unitConfiguration);
//     if (waterSupply) project.waterSupply = normalizeSingle(waterSupply);
//     if (projectArea) project.projectArea = normalizeSingle(projectArea);
//     if (totalUnits) project.totalUnits = normalizeNumber(totalUnits);
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
//       const files = req.files?.masterPlans || [];

//       project.masterPlans = await Promise.all(
//         plans.map(async (plan, index) => ({
//           planName: plan.planName,
//           carpetArea: plan.carpetArea,
//           planPhoto: files[index]
//             ? (await uploadImageToCloudinary(files[index].buffer, 'projects'))
//                 .secure_url
//             : plan.planPhoto || null,
//         })),
//       );
//     }

//     // ==================== SECTIONS ====================
//     if (sectionsData) {
//       const sectionsArr = JSON.parse(sectionsData);
//       const sectionFiles = req.files?.sectionImages || [];

//       project.sections = await Promise.all(
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
//             : sec.sectionImage || null,
//         })),
//       );
//     }

//     // ==================== BROCHURE IMAGE ====================
//     if (req.files?.brochureImage?.length) {
//       const uploaded = await uploadImageToCloudinary(
//         req.files.brochureImage[0].buffer,
//         'projects',
//       );
//       project.brochureImage = uploaded.secure_url;
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
import { uploadImageToCloudinary } from '../../config/cloudinaryUpload.js';

const normalizeSingle = (value) => (Array.isArray(value) ? value[0] : value);
const normalizeNumber = (value) =>
  Array.isArray(value) ? Number(value[0]) : Number(value);

// ==================== HELPER ====================
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

// ==================== CREATE PROJECT ====================
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
      masterPlansData,
      sectionsData,
    } = req.body;

    if (!projectName || !projectType || !projectStatus || !location) {
      return res
        .status(400)
        .json({ success: false, message: 'Required fields missing' });
    }

    // ==================== UPLOAD IMAGES ====================
    let brochureImage = null;
    let propertyImages = [];
    const masterPlansFiles = req.files?.masterPlans || [];
    const sectionFiles = req.files?.sectionImages || [];

    // Upload property images
    if (req.files?.propertyImages?.length) {
      for (const file of req.files.propertyImages) {
        const uploaded = await uploadImageToCloudinary(file.buffer, 'projects');
        propertyImages.push(uploaded.secure_url);
      }
    }

    // Upload brochure image
    if (req.files?.brochureImage?.length) {
      const uploaded = await uploadImageToCloudinary(
        req.files.brochureImage[0].buffer,
        'projects',
      );
      brochureImage = uploaded.secure_url;
    }

    // ==================== PARSE KEY FEATURES & AMENITIES ====================
    const parsedKeyFeatures = parseArrayField(keyFeatures);
    const parsedAmenities = parseArrayField(amenities);

    // ==================== MASTER PLANS ====================
    let masterPlans = [];
    if (masterPlansData) {
      const plans = JSON.parse(masterPlansData);
      masterPlans = await Promise.all(
        plans.map(async (plan, index) => ({
          planName: plan.planName,
          carpetArea: plan.carpetArea,
          planPhoto: masterPlansFiles[index]
            ? (
                await uploadImageToCloudinary(
                  masterPlansFiles[index].buffer,
                  'projects',
                )
              ).secure_url
            : null,
        })),
      );
    }

    // ==================== SECTIONS ====================
    let sections = [];
    if (sectionsData) {
      const sectionsArr = JSON.parse(sectionsData);
      sections = await Promise.all(
        sectionsArr.map(async (sec, index) => ({
          sectionName: sec.sectionName,
          sectionDescription: sec.sectionDescription,
          sectionImage: sectionFiles[index]
            ? (
                await uploadImageToCloudinary(
                  sectionFiles[index].buffer,
                  'projects',
                )
              ).secure_url
            : null,
        })),
      );
    }

    // ==================== CREATE PROJECT ====================
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
      sections,
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

// ==================== UPDATE PROJECT ====================
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
      masterPlansData,
      sectionsData,
      ...rest
    } = req.body;

    // Update basic fields
    Object.assign(project, rest);

    if (unitConfiguration)
      project.unitConfiguration = normalizeSingle(unitConfiguration);
    if (waterSupply) project.waterSupply = normalizeSingle(waterSupply);
    if (projectArea) project.projectArea = normalizeSingle(projectArea);
    if (totalUnits) project.totalUnits = normalizeNumber(totalUnits);
    if (possessionDate) project.possessionDate = possessionDate;

    project.keyFeatures = keyFeatures
      ? parseArrayField(keyFeatures)
      : project.keyFeatures;
    project.amenities = amenities
      ? parseArrayField(amenities)
      : project.amenities;

    // ==================== PROPERTY IMAGES ====================
    if (req.files?.propertyImages?.length) {
      for (const file of req.files.propertyImages) {
        const uploaded = await uploadImageToCloudinary(file.buffer, 'projects');
        project.propertyImages.push(uploaded.secure_url);
      }
    }

    // ==================== MASTER PLANS ====================
    if (masterPlansData) {
      const plans = JSON.parse(masterPlansData); // [{planName, carpetArea, planPhoto (old URL)}]
      const masterPlansFiles = req.files?.masterPlans || [];

      // Filter out placeholder files
      const validFiles = masterPlansFiles.filter((file) => file.size > 0);
      let fileIndex = 0;

      project.masterPlans = await Promise.all(
        plans.map(async (plan, index) => {
          // Check if a new file was uploaded for this plan
          const hasNewFile =
            masterPlansFiles[index] && masterPlansFiles[index].size > 0;

          let planPhoto = plan.planPhoto; // Keep existing URL by default

          if (hasNewFile) {
            // Upload the new image
            const uploaded = await uploadImageToCloudinary(
              masterPlansFiles[index].buffer,
              'projects',
            );
            planPhoto = uploaded.secure_url;
          }

          return {
            planName: plan.planName,
            carpetArea: plan.carpetArea,
            planPhoto: planPhoto,
          };
        }),
      );
    }

    // ==================== SECTIONS ====================
    if (sectionsData) {
      const sectionsArr = JSON.parse(sectionsData); // [{sectionName, sectionDescription, sectionImage (old URL)}]
      const sectionFiles = req.files?.sectionImages || [];

      project.sections = await Promise.all(
        sectionsArr.map(async (sec, index) => {
          // Check if a new file was uploaded for this section
          const hasNewFile =
            sectionFiles[index] && sectionFiles[index].size > 0;

          let sectionImage = sec.sectionImage; // Keep existing URL by default

          if (hasNewFile) {
            // Upload the new image
            const uploaded = await uploadImageToCloudinary(
              sectionFiles[index].buffer,
              'projects',
            );
            sectionImage = uploaded.secure_url;
          }

          return {
            sectionName: sec.sectionName,
            sectionDescription: sec.sectionDescription,
            sectionImage: sectionImage,
          };
        }),
      );
    }

    // ==================== BROCHURE IMAGE ====================
    if (req.files?.brochureImage?.length) {
      const uploaded = await uploadImageToCloudinary(
        req.files.brochureImage[0].buffer,
        'projects',
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

// ==================== GET PROJECTS ====================
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
    if (!project)
      return res
        .status(404)
        .json({ success: false, message: 'Project not found' });

    return res.status(200).json({ success: true, project });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// ==================== DELETE PROJECT ====================
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
