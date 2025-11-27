import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    heading: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    mainImages: {
      type: [String],
      required: true,
      validate: [arrayLimit, '{PATH} must have exactly 3 images'],
    },
    customerHeading: {
      type: String,
      required: true,
    },
    customerDescription: {
      type: String,
      required: true,
    },
    ratingText: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

function arrayLimit(val) {
  return val.length === 3;
}

const ProjectMain =
  mongoose.models.ProjectMain || mongoose.model('ProjectMain', projectSchema);

export default ProjectMain;
