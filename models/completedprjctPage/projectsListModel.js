import mongoose from 'mongoose';

const projectsListSchema = new mongoose.Schema(
  {
    heading: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    projectImage: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model('ProjectsList', projectsListSchema);
