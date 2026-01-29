// import mongoose from 'mongoose';
// const projectAdminSchema = new mongoose.Schema(
//   {
//     projectName: { type: String, required: true },
//     projectType: { type: String, required: true },
//     projectStatus: {
//       type: String,
//       enum: ['ongoing', 'upcoming', 'completed'],
//       required: true,
//     },
//     projectDescription: String,
//     location: { type: String, required: true },
//     projectAddress: String,
//     priceStartsFrom: Number,
//     plotSize: String,
//     possessionDate: Date,
//     unitConfiguration: {
//       type: String,
//       set: (v) => (Array.isArray(v) ? v[0] : v),
//     },
//     waterSupply: {
//       type: String,
//       set: (v) => (Array.isArray(v) ? v[0] : v),
//     },
//     projectArea: {
//       type: String,
//       set: (v) => (Array.isArray(v) ? v[0] : v),
//     },
//     totalUnits: {
//       type: Number,
//       set: (v) => (Array.isArray(v) ? Number(v[0]) : Number(v)),
//     },
//     masterPlans: [{ type: String }],
//     masterPlanImage: String,
//     brochureImage: String,
//     keyFeatures: [{ type: String }],
//     amenities: [{ type: String }],
//     aboutProject: String,
//     reraDescription: String,
//     noBrokerReraId: String,
//     builderProjectReraId: String,
//     locationUrl: String,
//     propertyImages: [{ type: String }],
//   },
//   { timestamps: true }
// );

// const ProjectAdmin =
//   mongoose.models.ProjectAdmin ||
//   mongoose.model('ProjectAdmin', projectAdminSchema);

// export default ProjectAdmin;

import mongoose from 'mongoose';

// Independent Section Schema with image
const sectionSchema = new mongoose.Schema({
  sectionName: { type: String }, // not mandatory
  sectionDescription: { type: String }, // not mandatory
  sectionImage: { type: String }, // optional
});

// Master Plan Schema
const masterPlanSchema = new mongoose.Schema({
  planName: { type: String, required: true },
  carpetArea: { type: String, required: true },
  planPhoto: { type: String, required: true },
});

// Project Schema
const projectAdminSchema = new mongoose.Schema(
  {
    projectName: { type: String, required: true },
    projectType: { type: String, required: true },
    projectStatus: {
      type: String,
      enum: ['ongoing', 'upcoming', 'completed'],
      required: true,
    },
    projectDescription: String,
    location: { type: String, required: true },
    projectAddress: String,
    priceStartsFrom: String,
    plotSize: String,
    possessionDate: Date,
    unitConfiguration: {
      type: String,
      set: (v) => (Array.isArray(v) ? v[0] : v),
    },
    waterSupply: {
      type: String,
      set: (v) => (Array.isArray(v) ? v[0] : v),
    },
    projectArea: {
      type: String,
      set: (v) => (Array.isArray(v) ? v[0] : v),
    },
    totalUnits: {
      type: Number,
      set: (v) => (Array.isArray(v) ? Number(v[0]) : Number(v)),
    },

    // Master Plans (independent)
    masterPlans: [masterPlanSchema],

    // Sections (completely independent)
    sections: [sectionSchema],

    brochureImage: String,
    keyFeatures: [{ type: String }],
    amenities: [{ type: String }],
    aboutProject: String,
    reraDescription: String,
    noBrokerReraId: String,
    builderProjectReraId: String,
    locationUrl: String,
    propertyImages: [{ type: String }],
  },
  { timestamps: true },
);

const ProjectAdmin =
  mongoose.models.ProjectAdmin ||
  mongoose.model('ProjectAdmin', projectAdminSchema);

export default ProjectAdmin;
