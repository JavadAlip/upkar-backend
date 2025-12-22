import mongoose from 'mongoose';
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
    priceStartsFrom: Number,
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
    masterPlans: [{ type: String }],
    masterPlanImage: String,
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
  { timestamps: true }
);

const ProjectAdmin =
  mongoose.models.ProjectAdmin ||
  mongoose.model('ProjectAdmin', projectAdminSchema);

export default ProjectAdmin;
