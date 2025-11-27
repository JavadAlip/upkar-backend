import mongoose from 'mongoose';

const completedProjectMainSchema = new mongoose.Schema(
  {
    heading: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    mainImage: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model(
  'CompletedProjectMain',
  completedProjectMainSchema
);
