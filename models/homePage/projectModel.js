import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ['ongoing', 'upcoming', 'completed'],
      required: true,
    },
    heading: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    bulletPoints: {
      type: [String],
      required: true,
    },
    boxMessage: {
      type: String,
      required: true,
    },
    image: {
      type: String, // Cloudinary URL or path
      required: true,
    },
  },
  { timestamps: true }
);

const Project = mongoose.model('Project', projectSchema);
export default Project;
