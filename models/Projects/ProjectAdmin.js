import mongoose from 'mongoose';

const sectionSchema = new mongoose.Schema({
  sectionName: { type: String },
  sectionDescription: { type: String },
  sectionImage: { type: String },
});

// Master Plan Schema
const masterPlanSchema = new mongoose.Schema({
  planName: { type: String },
  carpetArea: { type: String },
  planPhoto: { type: String },
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
    locationEmbedUrl: { type: String },
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
      set: (v) => {
        const num = Array.isArray(v) ? Number(v[0]) : Number(v);
        return isNaN(num) ? undefined : num;
      },
    },

    brochureFileName: {
      type: String,
    },

    brochureMimeType: {
      type: String,
    },

    // Master Plans
    masterPlans: [masterPlanSchema],

    // Sections
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
